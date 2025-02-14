import {Module} from '@nestjs/common';
import {WalletService} from './wallet.service';
import {WalletController} from './wallet.controller';
import {
    RelationalWalletPersistenceModule
} from "../database/wallet/infrastructure/persistence/relational/relational-persistence.module";
import {
    RelationalTransactionPersistenceModule
} from "../database/transaction/infrastructure/persistence/relational/relational-persistence.module";

@Module({
    imports: [
        RelationalWalletPersistenceModule,
        RelationalTransactionPersistenceModule,
    ],
    controllers: [
        WalletController
    ],
    providers: [
        WalletService,
    ],
    exports: [
        WalletService,
        RelationalWalletPersistenceModule,
    ],
})
export class WalletModule {}
