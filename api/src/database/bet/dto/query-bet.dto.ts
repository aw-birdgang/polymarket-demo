import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {plainToInstance, Transform, Type} from "class-transformer";
import {Bet} from "../domain/bet";

export class FilterBetDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @ValidateNested({ each: true })
  id: string;
}

export class SortBetDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Bet;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryBetDto {
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
    value ? plainToInstance(FilterBetDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterBetDto)
  filters?: FilterBetDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortBetDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortBetDto)
  sort?: SortBetDto[] | null;
}
