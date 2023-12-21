import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DogModule } from './dog/dog.module';
import configuration from './config/configuration';
import { DictActivityModule } from './dict-activity/dict-activity.module'
import { ActivityModule } from './activity/activity.module';
import { ErrorFilter } from './error.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CompetitionModule } from './competition/competition.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // TypeOrmModule.forRoot(),
    DatabaseModule,
    DogModule,
    DictActivityModule,
    ActivityModule,
    CompetitionModule,
    CourseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, {
    provide: APP_FILTER,
    useClass: ErrorFilter,
  },
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}
