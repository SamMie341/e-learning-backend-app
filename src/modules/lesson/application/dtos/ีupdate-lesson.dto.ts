import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLessonDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    videoUrl?: string;

    @IsString()
    @IsOptional()
    documentUrl?: string;

    @IsNumber()
    @IsOptional()
    order?: number;
}