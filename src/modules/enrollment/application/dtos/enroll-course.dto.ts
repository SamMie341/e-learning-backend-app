import { IsNotEmpty, IsUUID } from "class-validator";

export class EnrollCourseDto {
    @IsUUID()
    @IsNotEmpty({ message: 'ກະລຸນາລະບຸ ID ຂອງຫຼັກສູດທີ່ຕ້ອງການລົງທະບຽນ' })
    courseId: string;
}