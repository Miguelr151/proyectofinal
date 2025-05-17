import { IsString } from "class-validator"

export class CreateResourceDto {
    @IsString()
    title:       string
    @IsString()
    url:         string
    @IsString()
    description: string
    @IsString()
    uploadedBy:  string
}
