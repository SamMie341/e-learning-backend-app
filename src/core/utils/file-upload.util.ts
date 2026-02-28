import { extname } from 'path';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'; // เพิ่มบรรทัดนี้เพื่อใช้จัดการโฟลเดอร์

// 1. ฟังก์ชันตั้งชื่อไฟล์ใหม่
export const editFileName = (req, file, callback) => {
    // ใส่ fallback (|| '') เผื่อกรณีไฟล์ส่งมาแบบแปลกๆ แล้วไม่มี originalname ระบบจะได้ไม่พัง (500)
    const originalName = file.originalname || '';
    const fileExtName = extname(originalName);
    const randomName = uuidv4();

    callback(null, `${randomName}${fileExtName}`);
};

// 2. ฟังก์ชันตรวจสอบประเภทไฟล์
export const fileFilter = (req, file, callback) => {
    const allowedMimeTypes = [
        'image/jpeg', 'image/png', 'image/webp',
        'video/mp4', 'video/webm',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return callback(new BadRequestException('ประเภทไฟล์ไม่รองรับ อนุญาตเฉพาะรูปภาพ, วิดีโอ (MP4) และเอกสาร (PDF, DOCX) เท่านั้น'), false);
    }

    callback(null, true);
};

// 3. รวม Config สำหรับเรียกใช้งาน
export const getMulterConfig = (destination: string) => {
    // สร้าง Path ของโฟลเดอร์ปลายทาง
    const uploadPath = `./uploads/${destination}`;

    // เช็คว่าโฟลเดอร์มีหรือยัง ถ้ายังไม่มีให้สร้างอัตโนมัติ (ป้องกันระบบพังเพราะหาที่เซฟไม่เจอ)
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    return {
        storage: diskStorage({
            destination: uploadPath,
            filename: editFileName,
        }),
        fileFilter: fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 100, // 100MB
        },
    };
};