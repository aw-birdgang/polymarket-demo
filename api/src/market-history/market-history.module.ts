import {Module} from '@nestjs/common';
import {
    RelationalMarketHistoryPersistenceModule
} from "../database/market-history/infrastructure/persistence/relational/relational-persistence.module";
import {MarketHistoryController} from "./market-history.controller";
import {MarketHistoryService} from "./market-history.service";

// <database-block>
const infrastructurePersistenceModule = RelationalMarketHistoryPersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
    ],
    controllers: [MarketHistoryController],
    providers: [
        MarketHistoryService,
    ],
    exports: [MarketHistoryService, infrastructurePersistenceModule],
})
export class MarketHistoryModule {}
