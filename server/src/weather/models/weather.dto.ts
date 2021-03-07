import { IsNumber, IsString } from "class-validator";
import { WeatherEntity } from "./weather.entity";

export class WeatherDto {
    constructor(weather: WeatherEntity) {
        this.id = weather.id;
        this.temperature = weather.temperature;
        this.pressure = weather.pressure;
        this.humidity = weather.humidity;
        this.createdAt = weather.createdAt;
        this.name = weather.name;
    }

    id: string;
    temperature: number;
    pressure: number;
    humidity: number;
    createdAt: Date;
    name: string;
}

export class CreateWeatherDto {
    @IsNumber()
    temperature: number;
    @IsNumber()
    pressure: number;
    @IsNumber()
    humidity: number;
    @IsString()
    name: string;
}