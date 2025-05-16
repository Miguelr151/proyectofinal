import { PartialType } from '@nestjs/mapped-types';
import { CreateForumMessageDto } from './create-forum-message.dto';
import { IsString } from 'class-validator';

export class UpdateForumMessageDto extends PartialType(CreateForumMessageDto) {
    @IsString()
    author:    string;
    @IsString()   
    type:      string; 
    @IsString()  
    message:   string; 
}
