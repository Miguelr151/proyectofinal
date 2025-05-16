import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {

    @IsString()
    name:     string;
    @IsEmail()
    email:     string; 
    @IsString()
    phone:     string;
}
