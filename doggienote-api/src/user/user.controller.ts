import { Public } from './../auth/auth.service';
import {
    Controller,
    Post,
    Body,
    Logger,
  } from '@nestjs/common'
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  logger = new Logger(UserService.name);
    constructor(
        private readonly userService: UserService
    ){}
    
    @Public()
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
      const createdUser = await this.userService.createUser(createUserDto);
      return createdUser.username;
    }
}
