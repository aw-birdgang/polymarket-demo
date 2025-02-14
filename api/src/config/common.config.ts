import { registerAs } from "@nestjs/config";
import { IsEnum, IsInt, IsNumber, IsNumberString, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import validateConfig from "../common/utils/validate-config";
import { CommonConfig } from "./common-config.type";

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
}

// APP_NAME="NestJS API"
// APP_FALLBACK_LANGUAGE=en
// APP_HEADER_LANGUAGE=x-custom-lang
// ADMIN_PORT=5300
// ADMIN_NAME="NestJS API"
// ADMIN_FALLBACK_LANGUAGE=en
// ADMIN_HEADER_LANGUAGE=x-custom-lang
// API_PREFIX=api
// FRONTEND_DOMAIN=http://localhost:3000
// BACKEND_DOMAIN=http://localhost:3000

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string;

  // @IsNumberString()
  // @IsOptional()
  // GAME_BET_POINTS: string;
  //
  // @IsNumberString()
  // @IsOptional()
  // GOLD_DIGGER_RATE: string;
  //
  // @IsString()
  // @IsOptional()
  // GOLD_DIGGER_BOMB: string;
}

export default registerAs<CommonConfig>('common', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'dev',
    name: process.env.APP_NAME || 'app',
    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
    // port: process.env.APP_PORT
    //   ? parseInt(process.env.APP_PORT, 10)
    //   : process.env.PORT
    //     ? parseInt(process.env.PORT, 10)
    //     : 5200,
    port: 5200,
    apiPrefix: process.env.API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
    // gameBetPoints: Number(process.env.GAME_BET_POINTS || '1000'),
    // goldDiggerRate: Number(process.env.GOLD_DIGGER_RATE || '0.9'),
    // goldDiggerBomb: process.env.GOLD_DIGGER_BOMB || '1,3,5,24',
  };
});
