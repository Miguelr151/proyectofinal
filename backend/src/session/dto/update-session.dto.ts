import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';
import { IsString } from 'class-validator';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
    @IsString()
    studentId:  string;
    @IsString()
    tutorId:    string;
    @IsString()
    topic:      string;
    @IsString()
    duration:   string;
}
