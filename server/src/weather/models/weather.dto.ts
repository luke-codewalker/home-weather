import { IsNumber } from "class-validator";
import { WeatherEntity } from "./weather.entity";

export class WeatherDto {
    constructor(weather: WeatherEntity) {
        this.id = weather.id;
        this.temperature = weather.temperature;
        this.pressure = weather.pressure;
        this.humidity = weather.humidity;
        this.createdAt = weather.createdAt;
    }

    id: string;
    temperature: number;
    pressure: number;
    humidity: number;
    createdAt: Date;
}

export class CreateWeatherDto {
    @IsNumber()
    temperature: number;
    @IsNumber()
    pressure: number;
    @IsNumber()
    humidity: number;
}