import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MarketHistoryNotificationModule } from './checker/market-history-notification.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MarketHistoryNotificationModule,
  ],
})
export class SchedulerModule {}
