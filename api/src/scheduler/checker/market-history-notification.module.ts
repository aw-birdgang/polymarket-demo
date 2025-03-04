import { Module } from '@nestjs/common';
import { MarketHistoryNotificationService } from './market-history-notification.service';
import { MarketHistoryNotificationTask } from './tasks/market-history-notification.task';

@Module({
  providers: [MarketHistoryNotificationService, MarketHistoryNotificationTask],
})
export class MarketHistoryNotificationModule {}
