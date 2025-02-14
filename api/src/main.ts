import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModuleConfig } from "./common/swagger/swagger.module";
import { useContainer } from "class-validator";
import { ConfigService } from "@nestjs/config";
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from "@nestjs/common";
import validationOptions from "./common/utils/validation-options";
import { ResolvePromisesInterceptor } from "./common/utils/serializer.interceptor";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";
import { AllMainConfigType } from "./config/config.type";
import {AppModule} from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllMainConfigType>);

  const apiPrefix = configService.getOrThrow('common', { infer: true }).apiPrefix;
  const port = configService.getOrThrow('common', { infer: true }).port;
  console.log(`app > bootstrap > apiPrefix::${apiPrefix}, port::${port} `);

  app.enableShutdownHooks();
  app.setGlobalPrefix(
      configService.getOrThrow('common', { infer: true }).apiPrefix,
      {
        exclude: ['/'],
      },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
      new ResolvePromisesInterceptor(),
      new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // CLS 초기화
  initializeTransactionalContext();
  // TypeORM의 Repository 패치를 적용
  patchTypeORMRepositoryWithBaseRepository();
  // Swagger 설정 추가
  SwaggerModuleConfig.setupSwagger(app);

  await app.listen(configService.getOrThrow('common', { infer: true }).port);
}
bootstrap();
