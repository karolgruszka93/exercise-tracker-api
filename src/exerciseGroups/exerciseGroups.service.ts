import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExerciseGroup } from './interfaces/exerciseGroup.interface';
import { ExerciseGroups } from './exerciseGroups.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseGroupsService {
  constructor(
    @InjectRepository(ExerciseGroups)
    private exerciseGroupsRepository: Repository<ExerciseGroups>,
  ) {}

  findAll(): Promise<ExerciseGroups[]> {
    return this.exerciseGroupsRepository.find();
  }

  findOneById(id: string): Promise<ExerciseGroup> {
    return this.exerciseGroupsRepository.findOne({ where: { id } });
  }

  async create(exerciseGroup: ExerciseGroup): Promise<ExerciseGroup> {
    try {
      return await this.exerciseGroupsRepository.save(exerciseGroup);
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `Error while creating exercise group. ${error?.message}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while creating exercise group.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
