import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { SYSTEM_MESSAGES } from "../constants/message.constant";

export interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;

        return next.handle().pipe(
            map((data) => ({
                statusCode: statusCode,
                message: SYSTEM_MESSAGES.SUCCESS,
                data: data !== undefined ? data : null,
                timestamp: new Date().toISOString(),
            })),
        );
    }
}