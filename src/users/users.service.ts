import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  findUserById(id: string): Promise<Users> {
    return this.userRepository.findOne({ where: { id } });
  }

  findUserByFacebookToken(facebookToken: string): Promise<Users> {
    return this.userRepository.findOne({ where: { facebookToken } });
  }

  async createUser(user: User) {
    return await this.userRepository.save(user);
  }
}
