import { Injectable } from "@nestjs/common";
import { WeatherEntity } from "./models/weather.entity";
import { CreateWeatherDto, WeatherDto } from "./models/weather.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export type WeatherFilters = {
    since?: Date,
    minTemperature?: number,
    maxTemperature?: number
}

export type SortOption = 'ascending' | 'descending';

@Injectable()
export class WeatherService {
    constructor(@InjectRepository(WeatherEntity) private weatherRepository: Repository<WeatherEntity>) { }

    // async getAllWeatherData(filters: WeatherFilters, sortByDate: SortOption = 'ascending'): Promise<WeatherDto[]> {
    // const query = {};
    // if (filters.since) {
    //     query['createdAt'] = {
    //         '$gte': filters.since
    //     }
    // }

    // if (typeof filters.minTemperature !== 'undefined') {
    //     query['temperature'] = {
    //         '$gte': filters.minTemperature
    //     }
    // }

    // if (typeof filters.maxTemperature !== 'undefined') {
    //     query['temperature'] = {
    //         ...query['temperature'],
    //         '$lte': filters.maxTemperature
    //     }
    // }

    // const sortOptions = {
    //     createdAt: (sortByDate !== 'ascending' && sortByDate !== 'descending') ? 'ascending' : sortByDate
    // }
    // const allWeatherData = await this.weatherModel.find(query).sort(sortOptions).exec();
    //     return allWeatherData.map(p => new WeatherDto(p));
    async getAllWeatherData(): Promise<WeatherDto[]> {
        const allWeatherData = await this.weatherRepository.find();
        return allWeatherData.map(p => new WeatherDto(p));
    }

    async createNewWeather(weatherData: CreateWeatherDto) {
        const savedWeather = await this.weatherRepository.save(weatherData);
        return new WeatherDto(savedWeather);
    }

    async getWeatherByID(id: string) {
        let weather = null;
        try {
            weather = await this.weatherRepository.findOne(id);
        } catch (error) {
            throw error;
        }
        return weather ? new WeatherDto(weather) : null;
    }

    async deleteWeatherById(id: string) {
        try {
            await this.weatherRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}