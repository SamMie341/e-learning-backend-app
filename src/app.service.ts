import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'E-Learning API is running successfully',
      version: '1.0.0',
      status: 'Active',
    };
  }
}
