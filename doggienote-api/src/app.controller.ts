import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Logger,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { Public } from 'auth/auth.module';
import { User } from 'user/user.entity';
import { CreateUserDto } from 'user/user-create.dto';
import { UserService } from 'user/user.service';

@Controller()
export class AppController {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('user/create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    const createdUser = this.userService.createUser(createUserDto);
    return (await createdUser).username;
  }


  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
