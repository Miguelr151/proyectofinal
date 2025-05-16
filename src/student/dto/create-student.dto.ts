import { IsEmail, IsString } from "class-validator"

export class CreateStudentDto {
    @IsString()
    name:      string
    @IsString()
    @IsEmail()
    email:     string
    @IsString()
    phone:     string
}
