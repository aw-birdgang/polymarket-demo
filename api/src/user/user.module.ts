import {Module} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {
    RelationalUserPersistenceModule
} from "../database/user/infrastructure/persistence/relational/relational-persistence.module";

// <database-block>
const infrastructurePersistenceModule = RelationalUserPersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
    ],
    exports: [UserService, infrastructurePersistenceModule],
})
export class UserModule {}
