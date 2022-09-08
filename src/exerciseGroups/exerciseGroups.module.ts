import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseGroups } from './exerciseGroups.entity';
import { ExerciseGroupsController } from './exerciseGroups.controller';
import { ExerciseGroupsService } from './exerciseGroups.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseGroups])],
  providers: [ExerciseGroupsService],
  controllers: [ExerciseGroupsController],
})
export class ExerciseGroupsModule {}
