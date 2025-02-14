import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, SerializeOptions} from '@nestjs/common';
import {BetService} from './bet.service';
import {PlaceBetDto} from './dto/place-bet.dto';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Bet} from "../database/bet/domain/bet";

@ApiTags('BETS')
@Controller({
    path: 'bet',
    version: '1',
})
export class BetController {
    constructor(private readonly betService: BetService) {}

    @ApiCreatedResponse({
        type: Bet,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/place')
    @HttpCode(HttpStatus.CREATED)
    placeBet(
        @Body() placeBetDto: PlaceBetDto
    ) {
        return this.betService.placeBet(placeBetDto);
    }

    @ApiOkResponse({
        type: Bet,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/list/:marketId')
    @HttpCode(HttpStatus.OK)
    getMarketBets(@Param('marketId') marketId: string) {
        return this.betService.getBetsByMarketId(marketId);
    }

    @ApiOkResponse({
        type: Bet,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/user/:userId')
    @HttpCode(HttpStatus.OK)
    getUserBets(@Param('userId') userId: string) {
        return this.betService.getBetsByUserId(userId);
    }
}
