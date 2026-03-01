import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
    configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
    // เช็คว่าตอนนี้รันบน Production (Render) หรือไม่
    const isProduction = configService.get<string>('NODE_ENV') === 'production';

    return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        // ... (ตั้งค่า entities, synchronize ของเดิมปล่อยไว้เหมือนเดิม) ...

        // 🌟 พระเอกของเราคือตรงนี้ครับ: เพิ่มการตั้งค่า SSL
        ssl: isProduction
            ? { rejectUnauthorized: false } // ถ้าขึ้น Render ให้เปิด SSL (Supabase บังคับ)
            : false, // ถ้าทำในเครื่องตัวเอง (localhost) ไม่ต้องใช้ SSL
    };
};