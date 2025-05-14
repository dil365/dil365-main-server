import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDetailsService } from './user_details.service';
import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';

@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Get()
  findAll() {
    return this.userDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDetailDto: UpdateUserDetailDto) {
    return this.userDetailsService.update(+id, updateUserDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDetailsService.remove(+id);
  }
}
