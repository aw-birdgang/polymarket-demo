import {Module} from '@nestjs/common';
import {MarketService} from './market.service';
import {MarketController} from './market.controller';
import {
    RelationalMarketPersistenceModule
} from "../database/market/infrastructure/persistence/relational/relational-persistence.module";

// <database-block>
const infrastructurePersistenceModule = RelationalMarketPersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
    ],
    controllers: [MarketController],
    providers: [
        MarketService,
    ],
    exports: [MarketService, infrastructurePersistenceModule],
})
export class MarketModule {}
