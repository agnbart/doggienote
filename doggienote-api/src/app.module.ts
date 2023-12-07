import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DogModule } from './dog/dog.module';
import configuration from './config/configuration';
import { DictActivityModule } from './dict-activity/dict-activity.module'

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
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
