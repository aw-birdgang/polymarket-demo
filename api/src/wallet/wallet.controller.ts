import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, SerializeOptions} from '@nestjs/common';
import {WalletService} from './wallet.service';
import {DepositDto} from './dto/deposit.dto';
import {WithdrawDto} from './dto/withdraw.dto';
import {ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {Wallet} from "../database/wallet/domain/wallet";
import {InfinityPaginationResponse} from "../common/utils/dto/infinity-pagination-response.dto";

@ApiTags('WALLETS')
@Controller({
    path: 'wallet',
    version: '1',
})
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @ApiCreatedResponse({
        type: Wallet,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/deposit')
    @HttpCode(HttpStatus.CREATED)
    deposit(
        @Body() depositDto: DepositDto
    ) {
        return this.walletService.deposit(depositDto);
    }


    @Post('/withdraw')
    withdraw(@Body() withdrawDto: WithdrawDto) {
        return this.walletService.withdraw(withdrawDto);
    }


    @ApiOkResponse({
        type: Wallet,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/balance/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
    })
    getBalance(
        @Param('userId') userId: string,
    ) {
        return this.walletService.getBalance(userId);
    }


    @ApiOkResponse({
        type: InfinityPaginationResponse(Wallet),
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/transactions/:userId')
    @HttpCode(HttpStatus.OK)
    getUserTransactions(
        @Param('userId') userId: string,
    ) {
        return this.walletService.getUserTransactions(userId);
    }
}
