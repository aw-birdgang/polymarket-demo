import { ConfigService } from "@nestjs/config";
import * as ioredis from "ioredis";
import { AllMainConfigType } from "../config/config.type";

export function createRedis(configService: ConfigService<AllMainConfigType>): ioredis.Redis {
  const redisConfig = configService.getOrThrow('redis', { infer: true });
  const redis = new ioredis.Redis({
    host: redisConfig.host,
    port: Number(redisConfig.port),
    password: redisConfig.password || undefined,
    maxRetriesPerRequest: null,
  });

  redis.on('error', (err) => {
    console.error('Redis Error:', err);
  });

  redis.on('ready', () => {
    console.log('Redis is ready');
  });

  return redis;
}
