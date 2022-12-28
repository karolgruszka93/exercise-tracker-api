import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateExerciseGroupDto } from 'exerciseGroups/dto/createExerciseGroupDto';
import { ExerciseGroupsService } from 'exerciseGroups/exerciseGroups.service';
import { ExerciseGroup } from 'exerciseGroups/interfaces/exerciseGroup.interface';
import { GetExerciseGroupDto } from 'exerciseGroups/dto/getExerciseGroupDto';

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
