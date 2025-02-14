import { registerAs } from "@nestjs/config";

import { IsInt, IsString, Max, Min } from "class-validator";
import { RedisConfig } from "./redis-config.type";
import validateConfig from "../../common/utils/validate-config";

class EnvironmentVariablesValidator {
    @IsString()
    REDIS_HOST: string;

    @IsInt()
    @Min(0)
    @Max(65535)
    REDIS_PORT: number;

    @IsString()
    REDIS_PASSWORD: string;
}

export default registerAs<RedisConfig>('redis', () => {
    validateConfig(process.env, EnvironmentVariablesValidator);
    console.log(`process.env.REDIS_HOST::${process.env.REDIS_HOST}`);
    console.log(`process.env.REDIS_PORT::${process.env.REDIS_PORT}`);

    return {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
            ? parseInt(process.env.REDIS_PORT, 10)
            : 6379,
        password: process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : undefined,
    };
});
