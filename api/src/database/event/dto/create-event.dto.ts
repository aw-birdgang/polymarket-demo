import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;

    @IsString()
    @IsNotEmpty()
    volume: string;

    @IsNumber()
    @IsNotEmpty()
    chance: number;

    @IsBoolean()
    @IsOptional()
    isTrending?: boolean;
}
