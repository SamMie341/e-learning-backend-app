import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('ping')
  getHello() {
    return { status: 'OK', message: '🎉 แอป NestJS รับแขกได้แล้ว!' };
  }
}
