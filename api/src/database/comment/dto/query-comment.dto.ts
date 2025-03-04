import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, IsUUID, ValidateNested} from "class-validator";
import {plainToInstance, Transform, Type} from "class-transformer";
import {Comment} from "../domain/comment";

export class FilterCommentDto {
  @ApiPropertyOptional({ type: String, description: '댓글 ID (UUID)' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({ type: String, description: 'MarketHistory ID (UUID)' })
  @IsOptional()
  @IsUUID()
  marketId?: string;
}

export class SortCommentDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Comment;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCommentDto {
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
    value ? plainToInstance(FilterCommentDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCommentDto)
  filters?: FilterCommentDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortCommentDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCommentDto)
  sort?: SortCommentDto[] | null;
}
