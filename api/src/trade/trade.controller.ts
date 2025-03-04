import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
    SerializeOptions,
} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {NullableType} from '../common/utils/types/nullable.type';
import {InfinityPaginationResponseDto} from "../common/utils/dto/infinity-pagination-response.dto";
import {infinityPagination} from "../common/utils/infinity-pagination";
import {TradeService} from "./trade.service";
import {CreateTradeDto} from "./dto/create-trade.dto";
import {QueryTradeDto} from "../database/trade/dto/query-trade.dto";
import {Trade} from "../database/trade/domain/trade";

@ApiTags('TRADE')
@Controller({
    path: 'trade',
    version: '1',
})
export class TradeController {
    constructor(private readonly tradeService: TradeService) {}

    @ApiCreatedResponse({
        type: Trade,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createEvent(
        @Body() createEventDto: CreateTradeDto
    ){
        return this.tradeService.createTrade(createEventDto);
    }

    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async findAllAndPaging(
        @Query() query: QueryTradeDto,
    ): Promise<InfinityPaginationResponseDto<Trade>> {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const paginationResult = await this.tradeService.findManyWithPagination({
            filterOptions: query?.filters,
            sortOptions: query?.sort,
            paginationOptions: {
                page,
                limit,
            },
        });
        return infinityPagination(paginationResult, { page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Trade 상세 조회' })
    @ApiResponse({ status: 200, description: 'Trade 상세 정보 반환', type: Event })
    @ApiResponse({ status: 404, description: 'Trade 를 찾을 수 없습니다.' })
    async getEventById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<NullableType<Trade>> {
        return this.tradeService.getTradeById(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Trade 삭제' })
    @ApiResponse({ status: 200, description: 'Trade 가 성공적 으로 삭제 되었 습니다.' })
    async deleteEvent(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.tradeService.deleteTrade(id);
    }
}
