import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";
import { AllMainConfigType } from "../config/config.type";

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private configService: ConfigService<AllMainConfigType>,
  ) {}

  async set(key: string, value: string, expireTime: number = 3600): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expireTime);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
