import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WakaTime } from 'wakatime';
import * as dayjs from 'dayjs';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private readonly waka = new WakaTime(process.env.WAKATIME_API);
  private yesterday = dayjs().subtract(1, 'days').format('YYYY-MM-DD');

  @Cron('15 19 * * *')
  async handleCron() {
    const { data } = await this.get();
    this.logger.debug('Called when the current second is 45');
    this.logger.debug(JSON.stringify(data));
  }

  async get() {
    try {
      return this.waka.summaries(this.yesterday);
    } catch (e) {}
  }
}
