import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';
import { GetUserDto } from './dto/getUserDto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findUserById(@Param() params: GetUserDto): Promise<User> {
    return this.usersService.findUserById(params.id);
  }
}
