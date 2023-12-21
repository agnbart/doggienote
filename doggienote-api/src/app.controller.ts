import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { Public } from 'auth/auth.module';

@Controller()
export class AppController {
  logger = new Logger(AuthService.name);
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
