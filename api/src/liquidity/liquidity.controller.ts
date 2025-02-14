import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, SerializeOptions} from '@nestjs/common';
import {LiquidityService} from './liquidity.service';
import {ProvideLiquidityDto} from './dto/provide-liquidity.dto';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Liquidity} from "../database/liquidity/domain/liquidity";
import {InfinityPaginationResponse} from "../common/utils/dto/infinity-pagination-response.dto";

@ApiTags('LIQUIDITIES')
@Controller({
    path: 'liquidity',
    version: '1',
})
export class LiquidityController {
    constructor(private readonly liquidityService: LiquidityService) {}

    @ApiCreatedResponse({
        type: Liquidity,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/provide')
    @HttpCode(HttpStatus.CREATED)
    provideLiquidity(@Body() provideLiquidityDto: ProvideLiquidityDto) {
        return this.liquidityService.provideLiquidity(provideLiquidityDto);
    }


    @ApiOkResponse({
        type: InfinityPaginationResponse(Liquidity),
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/pool/:marketId')
    @HttpCode(HttpStatus.OK)
    getLiquidityPool(
        @Param('marketId') marketId: string,
    ) {
        return this.liquidityService.getLiquidityPool(marketId);
    }

    @ApiOkResponse({
        type: InfinityPaginationResponse(Liquidity),
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/user/:userId')
    @HttpCode(HttpStatus.OK)
    getUserLiquidity(
        @Param('userId') userId: string,
    ) {
        return this.liquidityService.getUserLiquidity(userId);
    }
}
