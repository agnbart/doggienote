import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import {
  ErrorDoggienoteNotCreated,
  ErrorDoggienoteNotFound,
} from 'error-doggienote';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRespository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    const courses = await this.courseRespository.find();
    if (courses === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return courses;
    }
  }

  async createOne(courseData: Partial<Course>): Promise<Course> {
    const newCourse = this.courseRespository.create(courseData);
    if (newCourse === null) {
      throw new ErrorDoggienoteNotCreated();
    }
    return await this.courseRespository.save(newCourse);
  }
}
