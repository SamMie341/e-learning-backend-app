import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ' })
    @IsNotEmpty({ message: 'ກະລຸນາໃສ່ອີເມວ' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'ກະລຸນາໃສ່ລະຫັດຜ່ານ' })
    password: string;

}