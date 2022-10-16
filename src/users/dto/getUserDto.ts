import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsString()
  facebookProfileId: string;
}
