import { Module } from "@nestjs/common";
import { UploadController } from "../presentation/upload.controller";
import { UploadFileUseCase } from "../application/use-cases/upload-file.use-case";

@Module({
    controllers: [UploadController],
    providers: [UploadFileUseCase],
})
export class UploadModule { }