import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { Weather, WeatherSchema } from './weather/models/weather.model';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo-db/natl', { useFindAndModify: false }),
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }])
  ],
  controllers: [AppController, WeatherController],
  providers: [WeatherService],
})
export class AppModule { }
