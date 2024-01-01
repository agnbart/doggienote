import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import {
  ErrorDoggienote,
  ErrorDoggienoteNotCreated,
} from './../error-doggienote';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(userDataDto: CreateUserDto): Promise<string> {
    const existedUser = await this.findOne(userDataDto.username);
    if (existedUser) {
      throw new ErrorDoggienote('This email already exist', 403, 'dn_6');
    }

    userDataDto.password = await this.hashPassword(userDataDto.password);

    const newUser = this.userRepository.create(userDataDto);
    await this.userRepository.save(newUser);
    if (!newUser) {
      throw new ErrorDoggienoteNotCreated();
    }
    return newUser.username;
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
