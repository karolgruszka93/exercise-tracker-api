import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExerciseGroupDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
