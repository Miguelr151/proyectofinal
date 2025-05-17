import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';
import { IsString } from 'class-validator';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {
    @IsString()
    title:       string;
    @IsString()   
    url:         string;
    @IsString()   
    description: string;
    @IsString()  
    uploadedBy:  string;
}
