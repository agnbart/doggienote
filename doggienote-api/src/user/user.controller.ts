import { Public } from 'auth/auth.service';
import {
    Controller,
    Get,
    Post,
    Logger,
    Body,
  } from '@nestjs/common'
import { CreateUserDto } from './user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    
    @Public()
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
      const createdUser = this.userService.createUser(createUserDto);
      return (await createdUser).username;
    }
}
