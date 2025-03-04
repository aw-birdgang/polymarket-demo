import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {plainToInstance, Transform, Type} from "class-transformer";
import {MarketHistory} from "../domain/market-history";

export class FilterMarketHistoryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @ValidateNested({ each: true })
  id: string;
}

export class SortMarketHistoryDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof MarketHistory;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryMarketHistoryDto {
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
    value ? plainToInstance(FilterMarketHistoryDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterMarketHistoryDto)
  filters?: FilterMarketHistoryDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortMarketHistoryDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortMarketHistoryDto)
  sort?: SortMarketHistoryDto[] | null;
}
