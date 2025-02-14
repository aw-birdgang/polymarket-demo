import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {plainToInstance, Transform, Type} from "class-transformer";
import {Liquidity} from "../domain/liquidity";

export class FilterLiquidityDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @ValidateNested({ each: true })
  id: string;
}

export class SortLiquidityDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Liquidity;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryLiquidityDto {
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
    value ? plainToInstance(FilterLiquidityDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterLiquidityDto)
  filters?: FilterLiquidityDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortLiquidityDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortLiquidityDto)
  sort?: SortLiquidityDto[] | null;
}
