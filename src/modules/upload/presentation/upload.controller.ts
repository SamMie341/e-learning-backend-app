import { Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Role } from "src/core/constants/role.constant";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { Roles } from "src/core/guards/roles.decorator";
import { RolesGuard } from "src/core/guards/roles.guard";
import { UploadFileUseCase } from "../application/use-cases/upload-file.use-case";
import { FileInterceptor } from "@nestjs/platform-express";
import { getMulterConfig } from "src/core/utils/file-upload.util";

@Controller('uploads')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.INSTRUCTOR, Role.ADMIN)
export class UploadController {
    constructor(private readonly uploadFileUseCase: UploadFileUseCase) { }

    @Post(':folder')
    @UseInterceptors(
        FileInterceptor('file', {
            ...getMulterConfig('media')
        })
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('folder') folder: string,
    ) {
        console.log(this.uploadFileUseCase.execute(file, folder));
        return this.uploadFileUseCase.execute(file, folder);
    }
}