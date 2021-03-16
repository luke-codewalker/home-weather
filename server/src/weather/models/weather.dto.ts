import { IsNumber, IsOptional, IsString } from "class-validator";
import { WeatherEntity } from "./weather.entity";

export class WeatherDto {
    constructor(weather: WeatherEntity) {
        this.id = weather.id;
        this.temperature = weather.temperature;
        this.pressure = weather.pressure;
        this.humidity = weather.humidity;
        this.createdAt = weather.createdAt;
        this.name = weather.name;
        this.voltage = weather.voltage;
    }

    id: string;
    temperature: number;
    pressure: number;
    humidity: number;
    createdAt: Date;
    name: string;
    voltage: number;
}

export class CreateWeatherDto {
    @IsNumber()
    temperature: number;
    @IsNumber()
    pressure: number;
    @IsNumber()
    humidity: number;
    @IsString()
    @IsOptional()
    name?: string;
    @IsNumber()
    @IsOptional()
    voltage?: number;
}