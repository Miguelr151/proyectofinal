import { IsEmail, IsString } from "class-validator"

export class CreateTutorDto {
    @IsString()
    name:         string
    @IsString()
    @IsEmail()
    email:        string
    @IsString()
    bio:          string
    @IsString()
    expertise:    string
}
