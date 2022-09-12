import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
  HealthCheck
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.75
        }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.mongoose.pingCheck('mongoDB')
    ]);
  }
}
