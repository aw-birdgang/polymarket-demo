import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {plainToInstance, Transform, Type} from "class-transformer";
import {Market} from "../domain/market";

export class FilterMarketDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @ValidateNested({ each: true })
  id: string;
}

export class SortMarketDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Market;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryMarketDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterMarketDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterMarketDto)
  filters?: FilterMarketDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortMarketDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortMarketDto)
  sort?: SortMarketDto[] | null;
}
