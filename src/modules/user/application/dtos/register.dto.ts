import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: 'ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8, { message: 'ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວຢ່າງນ້ອຍ 8 ຕົວອັກສອນ' })
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
}