import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty({ message: 'ກະລຸນາລະບຸບົດຮຽນ' })
    title: string;

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

    @IsUUID()
    @IsNotEmpty({ message: 'ກະລຸນາລະບຸ ID ຂອງຫຼັກສູດ' })
    courseId: string;
}