import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetailsService } from 'src/user_details/user_details.service';
import { CreateUserDetailDto } from 'src/user_details/dto/create-user_detail.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDetailsService: UserDetailsService
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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
