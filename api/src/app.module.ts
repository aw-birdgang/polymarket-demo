import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSource, DataSourceOptions} from "typeorm";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmConfigService} from "./database/typeorm-config.service";
import databaseConfig from "./database/config/database.config";
import commonConfig from "./config/common.config";
import redisConfig from "./redis/config/redis.config";
import {MarketModule} from "./market/market.module";
import {WalletModule} from "./wallet/wallet.module";
import {RedisModule} from "./redis/redis.module";
import {BetModule} from "./bet/bet.module";
import {UserModule} from './user/user.module';
import {EventModule} from './event/event.module';
import {TradeModule} from './trade/trade.module';
import {CommentModule} from './comment/comment.module';
import {MarketHistoryModule} from './market-history/market-history.module';
import {SchedulerModule} from "./scheduler/scheduler.module";


// <database-block>
const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    console.log('infrastructureDatabaseModule > DataSource options:', options);
    return new DataSource(options).initialize();
  },
});
// </database-block>

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        commonConfig,
        databaseConfig,
        redisConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    RedisModule,
    UserModule,
    MarketModule,
    BetModule,
    EventModule,
    CommentModule,
    TradeModule,
    WalletModule,
    MarketHistoryModule,
    SchedulerModule,
  ],
})
export class AppModule {}
