import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ErrorDoggienoteNotCreated } from 'error-doggienote';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    this.logger.log(`UserService email: ${username}`);
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      this.logger.error('Błąd przy tworzeniu użytkownika', error.stack);
      throw new ErrorDoggienoteNotCreated();
    }
  }
}
