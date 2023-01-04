import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Exercises } from 'exercises/exercises.entity';
import { Exercise } from 'exercises/interfaces/exercise.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercises)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  findOneById(id: string): Promise<Exercise> {
    return this.exercisesRepository.findOne({ where: { id } });
  }

  async create(exercise: Exercise): Promise<Exercise> {
    try {
      return await this.exercisesRepository.save(exercise);
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `Error while creating exercise. ${error?.message}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while creating exercise.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
