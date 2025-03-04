import {Injectable, Logger} from '@nestjs/common';
import {MarketHistoryService} from "../../market-history/market-history.service";
import {CreateMarketHistoryDto} from "../../market-history/dto/create-market-history.dto";

@Injectable()
export class MarketHistoryNotificationService {
  constructor(
      private readonly marketHistoryService: MarketHistoryService,
  ) {}

  private readonly logger = new Logger(MarketHistoryNotificationService.name);

  async sendNotifications() {
    this.logger.log('🚀 Sending market history notifications...');

    const createMarketHistoryDto: CreateMarketHistoryDto = {
      marketId: '123e4567-e89b-12d3-a456-426614174000',
      outcome: 'Boston Bruins',
      probability: 55.4,
      timestamp: new Date().toISOString(),
    };

    try {
      const marketHistory = await this.marketHistoryService.createMarketHistory(createMarketHistoryDto);
      this.logger.log(`✅ Market History Created: ${JSON.stringify(marketHistory)}`);
    } catch (error) {
      this.logger.error(`❌ Failed to create market history: ${error.message}`, error.stack);
    }
  }

}
