import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseGroups } from 'exerciseGroups/exerciseGroups.entity';
import { ExerciseGroupsController } from 'exerciseGroups/exerciseGroups.controller';
import { ExerciseGroupsService } from 'exerciseGroups/exerciseGroups.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseGroups])],
  providers: [ExerciseGroupsService],
  controllers: [ExerciseGroupsController],
})
export class ExerciseGroupsModule {}
