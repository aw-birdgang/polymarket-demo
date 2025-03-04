import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, SerializeOptions} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {InfinityPaginationResponseDto} from "../common/utils/dto/infinity-pagination-response.dto";
import {infinityPagination} from "../common/utils/infinity-pagination";
import {MarketHistoryService} from "./market-history.service";
import {CreateMarketHistoryDto} from "./dto/create-market-history.dto";
import {QueryMarketHistoryDto} from "../database/market-history/dto/query-market-history.dto";
import {MarketHistory} from "../database/market-history/domain/market-history";

@ApiTags('MARKET HISTORY')
@Controller({
    path: 'market-history',
    version: '1',
})
export class MarketHistoryController {
    constructor(private readonly marketHistoryService: MarketHistoryService) {}

    @ApiCreatedResponse({
        type: MarketHistory,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createMarket(
        @Body() createMarketHistoryDto: CreateMarketHistoryDto
    ) {
        return this.marketHistoryService.createMarketHistory(createMarketHistoryDto);
    }


    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async findAllAndPaging(
        @Query() query: QueryMarketHistoryDto,
    ): Promise<InfinityPaginationResponseDto<MarketHistory>> {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const paginationResult = await this.marketHistoryService.findManyWithPagination({
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
        type: MarketHistory,
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
    getMarketHistoryById(
        @Param('id') id: MarketHistory['id'],
    ) {
        return this.marketHistoryService.getMarketHistoryById(id);
    }


    @ApiOkResponse({
        type: MarketHistory,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
    })
    updateMarketHistory(
        @Param('id') id: MarketHistory['id'],
    ) {
        return this.marketHistoryService.updateMarketHistory(id);
    }
}
