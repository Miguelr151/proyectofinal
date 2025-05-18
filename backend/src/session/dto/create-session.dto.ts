import { IsDateString, IsString } from "class-validator"

export class CreateSessionDto {
    @IsString()
    studentId:  string
    @IsString()
    tutorId:    string
    @IsString()
    topic:      string
    @IsString()
    duration:   string
    @IsDateString()
    scheduledAt: string
}
