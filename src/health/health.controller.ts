import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { 
  ApiTags, 
  ApiCreatedResponse } from '@nestjs/swagger';
@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('readiness')
  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'string' }
          },
        },
      ],
    },
  })
  getHealthReadiness(): any {
    return this.healthService.getHealth();
  }

  @Get('liveness')
  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'string' }
          },
        },
      ],
    },
  })
  getHealthLiveness(): any {
    return this.healthService.getHealth();
  }
}
