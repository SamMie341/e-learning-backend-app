import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty({ message: 'ກະລຸນາລະບຸຊື່ຫຼັກສູດ' })
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0, { message: 'ລາຄາຫຼັກສູດຕ້ອງບໍ່ຕິດລົບ' })
    @IsOptional()
    price?: number;

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;
}