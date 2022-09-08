import { IsNotEmpty, IsString } from 'class-validator';

export class GetExerciseGroupDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
