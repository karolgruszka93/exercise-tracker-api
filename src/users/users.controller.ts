import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { User } from 'users/interfaces/users.interface';
import { GetUserDto } from 'users/dto/getUserDto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':profileId')
  async findUserByProfileId(@Param() params: GetUserDto): Promise<User> {
    return this.usersService.findUserByProfileId(params.profileId);
  }
}
