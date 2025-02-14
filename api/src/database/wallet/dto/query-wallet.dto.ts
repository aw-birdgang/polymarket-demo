import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {plainToInstance, Transform, Type} from "class-transformer";
import {Wallet} from "../domain/wallet";

export class FilterWalletDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @ValidateNested({ each: true })
  id: string;
}

export class SortWalletDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Wallet;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryWalletDto {
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
    value ? plainToInstance(FilterWalletDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterWalletDto)
  filters?: FilterWalletDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortWalletDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortWalletDto)
  sort?: SortWalletDto[] | null;
}
