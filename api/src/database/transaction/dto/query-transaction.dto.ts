import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {plainToInstance, Transform, Type} from "class-transformer";
import {Transaction} from "../domain/transaction";

export class FilterTransactionDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @ValidateNested({ each: true })
  id: string;
}

export class SortTransactionDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Transaction;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryTransactionDto {
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
    value ? plainToInstance(FilterTransactionDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterTransactionDto)
  filters?: FilterTransactionDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortTransactionDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortTransactionDto)
  sort?: SortTransactionDto[] | null;
}
