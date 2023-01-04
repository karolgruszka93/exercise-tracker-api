import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercises } from 'exercises/exercises.entity';
import { ExercisesService } from 'exercises/exercises.service';
import { ExercisesController } from 'exercises/exercises.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exercises])],
  providers: [ExercisesService],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
