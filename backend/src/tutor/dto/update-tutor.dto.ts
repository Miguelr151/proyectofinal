import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorDto } from './create-tutor.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateTutorDto extends PartialType(CreateTutorDto) {
  
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
  
  @IsString()
  bio: string;
  
  @IsString()
  expertise: string;
}
