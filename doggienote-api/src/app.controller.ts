import {
  Controller,
  Get,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from 'auth/auth.service';

@Controller()
export class AppController {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly appService: AppService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
