import { WeatherDto } from "./weather.dto";
import { WeatherEntity } from "./weather.entity";

export class Overview extends WeatherDto {
    trend: {
        temperature: number,
        humidity: number,
        pressure: number,
        voltage: number
    }

    constructor({ current, previous }: { current: WeatherEntity, previous: WeatherEntity }) {
        super(current);

        this.trend = {
            // calculate rise or fall of values as fractions of previous values
            temperature: (current.temperature - previous.temperature) / previous.temperature,
            humidity: (current.humidity - previous.humidity) / previous.humidity,
            pressure: (current.pressure - previous.pressure) / previous.pressure,
            voltage: (current.voltage - previous.voltage) / previous.voltage
        }
    }
}