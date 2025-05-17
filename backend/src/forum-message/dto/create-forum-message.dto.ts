import { IsString } from "class-validator"

export class CreateForumMessageDto {
    @IsString()
    author:    string
    @IsString()
    type:      string
    @IsString()
    message:   string
}
