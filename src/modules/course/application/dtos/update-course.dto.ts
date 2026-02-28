import { IsBoolean, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0, { message: 'ລາຄາຫຼັກສຸູດຕ້ອງບໍ່ຕິດລົບ' })
    @IsOptional()
    price?: number;

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;
}