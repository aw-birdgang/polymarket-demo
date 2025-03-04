import {Module} from '@nestjs/common';
import {TradeService} from "./trade.service";
import {TradeController} from "./trade.controller";
import {
    RelationalTradePersistenceModule
} from "../database/trade/infrastructure/persistence/relational/relational-persistence.module";

// <database-block>
const infrastructurePersistenceModule = RelationalTradePersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
    ],
    controllers: [TradeController],
    providers: [
        TradeService,
    ],
    exports: [TradeService, infrastructurePersistenceModule],
})
export class TradeModule {}
