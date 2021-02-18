import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { apiInfo, ApiInfo } from './models/api-info.dto';

@ApiTags('App')
@Controller()
export class AppController {
  @Get('/')
  rootGetCall(): ApiInfo {
    return apiInfo;
  }
}
