import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/createExerciseGroupDto';
import { ExerciseGroupsService } from './exerciseGroups.service';
import { ExerciseGroup } from './interfaces/exerciseGroup.interface';
import { GetExerciseGroupDto } from './dto/getExerciseGroupDto';

@Controller('exercise-groups')
export class ExerciseGroupsController {
  constructor(private exerciseGroupsService: ExerciseGroupsService) {}

  @Get()
  async findAll(): Promise<ExerciseGroup[]> {
    return this.exerciseGroupsService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param() params: GetExerciseGroupDto,
  ): Promise<ExerciseGroup> {
    return this.exerciseGroupsService.findOneById(params.id);
  }

  @Post()
  async create(@Body() exerciseGroupDto: CreateExerciseGroupDto) {
    const exerciseGroup = {
      description: exerciseGroupDto.description,
    };
    return this.exerciseGroupsService.create(exerciseGroup);
  }
}
