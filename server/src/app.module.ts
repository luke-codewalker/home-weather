import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { WeatherEntity } from './weather/models/weather.entity';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([WeatherEntity])
  ],
  controllers: [AppController, WeatherController],
  providers: [WeatherService],
})
export class AppModule { }
