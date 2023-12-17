import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return await this.courseService.findAll();
  }

  @Post()
  async createCourse(@Body() courseData: Partial<Course>): Promise<Course> {
    return await this.courseService.createOne(courseData);
  }
}
