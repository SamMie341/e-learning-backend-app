import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(message, status);
    }
}

export class CourseNotFoundException extends BusinessException {
    constructor(courseId: string) {
        super(`Course with ID ${courseId} not found`, HttpStatus.NOT_FOUND);
    }
}

export class InvalidEnrollmentException extends BusinessException {
    constructor(reason: string) {
        super(`Cannot enroll in course: ${reason}`, HttpStatus.FORBIDDEN);
    }
}