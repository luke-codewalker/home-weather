import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { CreateWeatherDto, WeatherDto } from './models/weather.dto';
import { WeatherFilters, WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @ApiQuery({
        name: 'since',
        required: false,
    })
    @ApiQuery({
        name: 'minTemperature',
        required: false,
    })
    @ApiQuery({
        name: 'maxTemperature',
        required: false,
    })
    @Get()
    async getAllWeatherData(
        @Query('since') sinceFilter: Date,
        @Query(encodeURIComponent('minTemperature')) minTemperature: number,
        @Query(encodeURIComponent('maxTemperature')) maxTemperature: number,
    ) {

        const filters: WeatherFilters = {};
        if (!isNaN(sinceFilter.getTime())) {
            filters.since = new Date(sinceFilter);
        }
        if (!isNaN(minTemperature)) {
            filters.minTemperature = minTemperature;
        }
        if (!isNaN(maxTemperature)) {
            filters.maxTemperature = maxTemperature;
        }
        return this.weatherService.getAllWeatherData(filters);
    }

    @Get(':id')
    async getWeatherById(@Param('id') id: string) {
        let weather: WeatherDto;
        try {
            weather = await this.weatherService.getWeatherByID(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message ?? 'Internal Server Error'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!weather) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: `No weather data found for ${id}`
            }, HttpStatus.NOT_FOUND);
        } else {
            return weather;
        }
    }

    @Post()
    async createWeather(@Body() newWeatherData: CreateWeatherDto) {
        return this.weatherService.createNewWeather(newWeatherData);
    }

    @Delete(':id')
    async deleteWeatherById(@Param('id') id: string) {
        let deletedWeather: WeatherDto;
        try {
            deletedWeather = await this.weatherService.deleteWeatherById(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message ?? 'Internal Server Error'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!deletedWeather) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: `No weather data found for ${id}`
            }, HttpStatus.NOT_FOUND);
        } else {
            return deletedWeather;
        }
    }
}
