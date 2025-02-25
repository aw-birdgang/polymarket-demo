import {Module} from '@nestjs/common';
import {EventService} from "./event.service";
import {EventController} from "./event.controller";
import {
    RelationalEventPersistenceModule
} from "../database/event/infrastructure/persistence/relational/relational-persistence.module";

// <database-block>
const infrastructurePersistenceModule = RelationalEventPersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
    ],
    controllers: [EventController],
    providers: [
        EventService,
    ],
    exports: [EventService, infrastructurePersistenceModule],
})
export class EventModule {}
