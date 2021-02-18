import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CreateWeatherDto } from "./weather.dto";

@Schema()
export class Weather {
    constructor(data: CreateWeatherDto) {
        this.temperature = data.temperature;
        this.humidity = data.humidity;
        this.pressure = data.pressure;
    }

    @Prop({
        required: true
    })
    temperature: number;

    @Prop({
        required: true
    })
    humidity: number;

    @Prop({
        required: true
    })
    pressure: number;

    @Prop({
        required: true,
        default: Date.now
    })
    createdAt: Date;
}

export type WeatherDocument = Weather & Document;

export const WeatherSchema = SchemaFactory.createForClass(Weather);
