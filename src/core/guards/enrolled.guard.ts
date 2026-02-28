import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { DataSource } from "typeorm";
import { Role } from "../constants/role.constant";

@Injectable()
export class EnrollGuard implements CanActivate {
    constructor(private readonly dataSource: DataSource) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const params = request.params;

        if (!user) {
            throw new ForbiddenException('ກະລຸຸນາເຂົ້າສູ່ລະບົບ');
        }

        if (user.role === Role.ADMIN) {
            return true;
        }

        let courseId = params.courseId;

        if (!courseId && params.id) {
            const lessonResult = await this.dataSource.query(
                'SELECT course_id FROM lessons WHERE id = $1',
                [params.id],
            );
            if (lessonResult.length > 0) {
                courseId = lessonResult[0].course_id;
            }
        }
        if (!courseId) {
            throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນຫຼັກສູດ ຫຼື ບົດຮຽນທີ່ຕ້ອງການເຂົ້າເຖິງ');
        }

        const courseResult = await this.dataSource.query(
            'SELECT instructor_id FROM courses WHERE id = $1',
            [courseId]
        );

        if (courseResult.length > 0 && courseResult[0].instructor_id === user.id) {
            return true;
        }

        const enrollmentResult = await this.dataSource.query(
            'SELECT id FROM enrollments WHERE student_id = $1 AND course_id = $2 AND status = $3',
            [user.id, courseId, 'ACTIVE'],
        );

        if (enrollmentResult.length === 0) {
            throw new ForbiddenException('ທ່ານຕ້ອງລົງທະບຽນຮຽນຫຼັກສູດນີ້ກ່ອນ ຈຶ່ງສາມາດເຂົ້າເບິ່ງເນື້ອຫາບົດຮຽນໄດ້');
        }

        return true;
    }

}