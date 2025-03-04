import {Module} from '@nestjs/common';
import {MarketHistoryNotificationService} from './market-history-notification.service';
import {MarketHistoryNotificationTask} from './tasks/market-history-notification.task';
import {MarketHistoryModule} from "../../market-history/market-history.module";

@Module({
  imports: [
    MarketHistoryModule,
  ],
  providers: [
    MarketHistoryNotificationService,
    MarketHistoryNotificationTask
  ],
  exports: [MarketHistoryNotificationService],
})
export class MarketHistoryNotificationModule {}
