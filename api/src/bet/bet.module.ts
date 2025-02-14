import {Module} from '@nestjs/common';
import {BetService} from './bet.service';
import {BetController} from './bet.controller';
import {
    RelationalBetPersistenceModule
} from "../database/bet/infrastructure/persistence/relational/relational-persistence.module";

// <database-block>
const infrastructurePersistenceModule = RelationalBetPersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
    ],
    controllers: [BetController],
    providers: [
        BetService,
    ],
    exports: [BetService, infrastructurePersistenceModule],
})
export class BetModule {}
