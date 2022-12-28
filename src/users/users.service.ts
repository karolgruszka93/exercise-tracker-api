import { Injectable } from '@nestjs/common';
import { User } from 'users/interfaces/users.interface';
import { Users } from 'users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  findUserByProfileId(profileId: string): Promise<Users> {
    return this.userRepository.findOne({ where: { profileId } });
  }

  async createUser(user: User) {
    return await this.userRepository.save(user);
  }
}
