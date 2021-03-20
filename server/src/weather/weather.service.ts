import { Injectable } from "@nestjs/common";
import { WeatherEntity } from "./models/weather.entity";
import { CreateWeatherDto, WeatherDto } from "./models/weather.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";

export type WeatherFilters = {
    since?: Date,
    minTemperature?: number,
    maxTemperature?: number
}

export type SortOption = 'ASC' | 'DESC';

@Injectable()
export class WeatherService {
    constructor(@InjectRepository(WeatherEntity) private weatherRepository: Repository<WeatherEntity>) { }

    async getAllWeatherData(filters: WeatherFilters, sortByDate: SortOption = 'ASC'): Promise<WeatherDto[]> {
        const query = { where: [] };

        if (filters.since) {
            query['where'] = [{ createdAt: MoreThanOrEqual(filters.since) }];
        }

        if (typeof filters.minTemperature !== 'undefined') {
            query['where'][0] = { ...query['where'][0], temperature: MoreThanOrEqual(filters.minTemperature) };
        }

        if (typeof filters.maxTemperature !== 'undefined') {
            query['where'][0] = { ...query['where'][0], temperature: LessThanOrEqual(filters.maxTemperature) };

        }
        query['order'] = { createdAt: (sortByDate !== 'ASC' && sortByDate !== 'DESC') ? 'ASC' : sortByDate };

        const allWeatherData = await this.weatherRepository.find(query);
        return allWeatherData.map(p => new WeatherDto(p));
    }

    async getLatestWeatherData() {
        const weatherData = await this.weatherRepository.find({ order: { createdAt: 'DESC' }, take: 1 });
        return new WeatherDto(weatherData[0]);
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