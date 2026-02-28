import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class UploadFileUseCase {
    execute(file: Express.Multer.File, folder: string) {
        if (!file) {
            throw new BadRequestException('ບໍ່ພົບໄຟລ໌ທີ່ຕ້ອງການອັບໂຫຼດ');
        }

        const fileUrl = `/static/${folder}/${file.filename}`;

        return {
            originalName: file.originalname,
            fileName: file.filename,
            mimType: file.mimetype,
            size: file.size,
            url: fileUrl,
        }
    }
}