import {Module} from '@nestjs/common';
import {
    RelationalLiquidityPersistenceModule
} from "../database/liquidity/infrastructure/persistence/relational/relational-persistence.module";
import {LiquidityController} from "./liquidity.controller";
import {LiquidityService} from "./liquidity.service";

// <database-block>
const infrastructurePersistenceModule = RelationalLiquidityPersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
    ],
    controllers: [LiquidityController],
    providers: [
        LiquidityService,
    ],
    exports: [LiquidityService, infrastructurePersistenceModule],
})
export class LiquidityModule {}
