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

  findUserByFacebookProfileId(facebookProfileId: string): Promise<Users> {
    return this.userRepository.findOne({ where: { facebookProfileId } });
  }

  async createUser(user: User) {
    return await this.userRepository.save(user);
  }
}
