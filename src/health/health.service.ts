import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth(): any {
    return { status: 'UP' };
  }
}
