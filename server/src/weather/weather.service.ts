import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Weather, WeatherDocument } from "./models/weather.model";
import { Model } from 'mongoose';
import { CreateWeatherDto, WeatherDto } from "./models/weather.dto";

export type WeatherFilters = {
    since?: Date,
    minTemperature?: number,
    maxTemperature?: number
}

@Injectable()
export class WeatherService {
    constructor(@InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>) { }

    async getAllWeatherData(filters: WeatherFilters): Promise<WeatherDto[]> {
        const query = {};
        if (filters.since) {
            query['createdAt'] = {
                '$gte': filters.since
            }
        }

        if (typeof filters.minTemperature !== 'undefined') {
            query['temperature'] = {
                '$gte': filters.minTemperature
            }
        }

        if (typeof filters.maxTemperature !== 'undefined') {
            query['temperature'] = {
                ...query['temperature'],
                '$lte': filters.maxTemperature
            }
        }
        console.log(filters, query);

        const allWeatherData = await this.weatherModel.find(query).exec();
        return allWeatherData.map(p => new WeatherDto(p));
    }

    async createNewWeather(weatherData: CreateWeatherDto) {
        const newWeather = new this.weatherModel(weatherData);
        const savedWeather = await newWeather.save();
        return new WeatherDto(savedWeather);
    }

    async getWeatherByID(id: string) {
        let weather = null;
        try {
            weather = await this.weatherModel.findById(id);
        } catch (error) {
            throw error;
        }
        return weather ? new WeatherDto(weather) : null;
    }

    async deleteWeatherById(id: string) {
        let deletedWeather = null;
        try {
            deletedWeather = await this.weatherModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
        return deletedWeather ? new WeatherDto(deletedWeather) : null;
    }
}