import { DatabaseConfig } from "../database/config/database-config.type";
import { RedisConfig } from "../redis/config/redis-config.type";
import { CommonConfig } from "./common-config.type";
import { AppConfig } from "./app-config.type";

export type AllMainConfigType = {
  common: CommonConfig;
  app: AppConfig;
  redis: RedisConfig;
  database: DatabaseConfig;
};
