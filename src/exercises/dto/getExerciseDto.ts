import { IsNotEmpty, IsString } from 'class-validator';

export class GetExerciseDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
