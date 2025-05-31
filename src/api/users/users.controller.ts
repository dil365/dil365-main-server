import { 
  Get,
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  Controller, 
  ConflictException, 
  ForbiddenException, 
  UseGuards,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UserDetailsService } from 'src/common/user_details/user_details.service';
import { CreateUserDetailDto } from 'src/common/user_details/dto/create-user_detail.dto';
import { TokenSessionsService } from 'src/common/token_sessions/token_sessions.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDetailsService: UserDetailsService,
    private readonly tokenSessionsService: TokenSessionsService,
  ) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto & CreateUserDetailDto) {
    /**
      * check email if already registered;
    */
    const exist = await this.usersService.findBy({ email: createUserDto.email });
    if (exist) {
      throw new ConflictException()
    }

    /**
     * save user credentials to `Users` table
     */
    const created_user = await this.usersService.create(createUserDto);

    /**
     * save user details to `UserDetails` table
     */
    const created_user_detail = await this.usersDetailsService.create(created_user.id, createUserDto);

    /**
     * #TODO: send confirm email
     */

    /**
     * send response to client
     */
    return {
      success: true,
      message: "Done",
      date: created_user.created_at
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    /**
     * look for user with user email
     */
    const user = await this.usersService.findByLogin(loginUserDto);
    if (!user) {
      throw new ForbiddenException({
        message: "Email or password is worng!"
      });
    }

    /**
     * create access & refresh token and register it to `TokenSessions` table
     */
    const access_token = await this.tokenSessionsService.create(user.id, {
      created_for: 'access_token',
      payload: {
        email: user.email,
        id: user.id
      },
    });

    /**
     * send response to client
     */
    return access_token;
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async authentication(@Request() req){
    const user = await this.usersService.findBy({ id: req.user.id }, true);
    return {
      ...user.UserDetails,
      email: user.email,
      email_registered: user.email_registered,
    };
  }
}
