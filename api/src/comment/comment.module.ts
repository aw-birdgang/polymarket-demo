import {Module} from '@nestjs/common';
import {
    RelationalCommentPersistenceModule
} from "../database/comment/infrastructure/persistence/relational/relational-persistence.module";
import {CommentController} from "./comment.controller";
import {CommentService} from "./comment.service";
import {MarketModule} from "../market/market.module";

// <database-block>
const infrastructurePersistenceModule = RelationalCommentPersistenceModule;
// </database-block>

@Module({
    imports: [
        infrastructurePersistenceModule,
        MarketModule,
    ],
    controllers: [CommentController],
    providers: [
        CommentService,
    ],
    exports: [CommentService, infrastructurePersistenceModule],
})
export class CommentModule {}
