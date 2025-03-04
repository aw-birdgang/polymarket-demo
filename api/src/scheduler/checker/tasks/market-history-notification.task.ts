import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MarketHistoryNotificationService } from '../market-history-notification.service';

@Injectable()
export class MarketHistoryNotificationTask {
  constructor(private readonly checkerService: MarketHistoryNotificationService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    this.checkerService.sendNotifications();
  }
}
