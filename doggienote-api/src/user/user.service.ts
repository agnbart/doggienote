import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
 
  async findOne(username: string): Promise<User> {
    this.logger.log(`UserService email: ${username}`);
    return this.userRepository.findOne({where: {username}});
  }
}
