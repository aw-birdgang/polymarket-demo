import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AllMainConfigType } from "../config/config.type";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllMainConfigType>) {}

  private readonly logger = new Logger(TypeOrmConfigService.name);

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type = this.configService.getOrThrow('database', { infer: true }).type;
    const url = this.configService.getOrThrow('database', { infer: true }).url;
    const host = this.configService.getOrThrow('database', { infer: true }).host || 'localhost';
    const port = this.configService.getOrThrow('database', { infer: true }).port || 3306;
    const username = this.configService.getOrThrow('database', { infer: true }).username || 'root';
    const password = this.configService.getOrThrow('database', { infer: true }).password || 'password';
    const database = this.configService.getOrThrow('database', { infer: true }).name || 'api';
    const synchronize = this.configService.getOrThrow('database', { infer: true }).synchronize || true;
    const logging = this.configService.getOrThrow('database', { infer: true }).logging;

    this.logger.log(
        `type ::${type},
        url ::${url}, 
        host ::${host}, 
        port ::${port}, 
        username ::${username}, 
        password ::${password},
        database ::${database},
        synchronize ::${synchronize},
        logging ::${logging}`
    );

    this.logger.log(`TypeOrmConfigService > __dirname ::${__dirname}, `);

    return {
      type: type,
      url: url,
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      synchronize: synchronize,
      logging: logging,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
