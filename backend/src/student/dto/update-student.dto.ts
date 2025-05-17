import { PartialType } from '@nestjs/mapped-types'
import { CreateStudentDto } from './create-student.dto'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  password?: string
}
