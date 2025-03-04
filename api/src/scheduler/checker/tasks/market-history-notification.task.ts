import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {MarketHistoryNotificationService} from '../market-history-notification.service';

@Injectable()
export class MarketHistoryNotificationTask {

  private readonly logger = new Logger(MarketHistoryNotificationTask.name);

  constructor(private readonly marketHistoryNotificationService: MarketHistoryNotificationService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.log('⏳ Running Market History Notification Task...');
    try {
      await this.marketHistoryNotificationService.sendNotifications();
      this.logger.log('✅ Market History Notification Task completed successfully.');
    } catch (error) {
      this.logger.error(`❌ Market History Notification Task failed: ${error.message}`, error.stack);
    }
  }
}
