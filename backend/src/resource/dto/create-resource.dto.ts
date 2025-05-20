import { IsString, IsOptional } from 'class-validator'

export class CreateResourceDto {
  @IsString()
  title: string

  @IsString()
  url: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  uploadedBy: string
}
