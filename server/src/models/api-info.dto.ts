export class ApiInfo {
    title: string;
    description: string;
    version: string;

    constructor() {
        this.title = 'Home Weather API';
        this.description = 'The Home Weather API to collect data from my temperature sensor.';
        this.version = '0.0.1';
    }
}

export const apiInfo = new ApiInfo();