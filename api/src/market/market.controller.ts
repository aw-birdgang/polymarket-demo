import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, SerializeOptions} from '@nestjs/common';
import {MarketService} from './market.service';
import {CreateMarketDto} from './dto/create-market.dto';
import {Market} from "../database/market/domain/market";
import {InfinityPaginationResponseDto} from "../common/utils/dto/infinity-pagination-response.dto";
import {QueryMarketDto} from "../database/market/dto/query-market.dto";
import {infinityPagination} from "../common/utils/infinity-pagination";
import {ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";

@ApiTags('MARKETS')
@Controller({
    path: 'market',
    version: '1',
})
export class MarketController {
    constructor(private readonly marketService: MarketService) {}

    @ApiCreatedResponse({
        type: Market,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createMarket(
        @Body() createMarketDto: CreateMarketDto
    ) {
        return this.marketService.createMarket(createMarketDto);
    }


    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async findAllAndPaging(
        @Query() query: QueryMarketDto,
    ): Promise<InfinityPaginationResponseDto<Market>> {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const paginationResult = await this.marketService.findManyWithPagination({
            filterOptions: query?.filters,
            sortOptions: query?.sort,
            paginationOptions: {
                page,
                limit,
            },
        });
        return infinityPagination(paginationResult, { page, limit });
    }


    @ApiOkResponse({
        type: Market,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
    })
    getMarket(
        @Param('id') id: string,
    ) {
        return this.marketService.getMarketById(id);
    }


    @ApiOkResponse({
        type: Market,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/resolve/:id')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
    })
    resolveMarket(
        @Param('id') id: string,
    ) {
        return this.marketService.resolveMarket(id);
    }

}
