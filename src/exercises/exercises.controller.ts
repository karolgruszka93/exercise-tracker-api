import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Exercises } from 'exercises/exercises.entity';
import { ExercisesService } from 'exercises/exercises.service';
import { GetExerciseDto } from 'exercises/dto/getExerciseDto';
import { CreateExerciseDto } from 'exercises/dto/createExerciseDto';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get(':id')
  async findOneById(@Param() params: GetExerciseDto): Promise<Exercises> {
    return this.exercisesService.findOneById(params.id);
  }

  @Post()
  async create(@Body() exerciseDto: CreateExerciseDto) {
    const exercise = {
      name: exerciseDto.name,
    };
    return this.exercisesService.create(exercise);
  }
}
