import {Injectable, Logger} from '@nestjs/common';
import {DepositDto} from './dto/deposit.dto';
import {WithdrawDto} from './dto/withdraw.dto';
import {WalletRepository} from "../database/wallet/infrastructure/persistence/wallet.repository";
import {TransactionRepository} from "../database/transaction/infrastructure/persistence/transaction.repository";
import {plainToInstance} from "class-transformer";
import {Wallet} from "../database/wallet/domain/wallet";
import {FindOptionsWhere} from "typeorm";
import {SortTransactionDto} from "../database/transaction/dto/query-transaction.dto";

@Injectable()
export class WalletService {
    constructor(
        private readonly walletRepository: WalletRepository,
        private readonly transactionRepository: TransactionRepository,
    ) {}

    private readonly logger = new Logger(WalletService.name);

    async deposit(depositDto: DepositDto): Promise<Wallet> {
        const whereConditions: FindOptionsWhere<Wallet> = {};
        whereConditions.userId = depositDto.userId;
        let wallet = await this.walletRepository.findOneWithWhere({ whereConditions });
        if (!wallet) {
            const clonedPayload = {
                balance: depositDto.amount,
                ...plainToInstance(Wallet, depositDto),
            };
            this.logger.log(`deposit depositDto.userId :: ${depositDto.userId}, depositDto.amount:: ${depositDto.amount}`);
            wallet = await this.walletRepository.create(clonedPayload);
        }
        // const clonedPayloadTransaction = {
        //     userId: depositDto.userId,
        //     type: 'DEPOSIT',
        //     amount: depositDto.amount,
        //     ...plainToInstance(Transaction, depositDto),
        // };
        // await this.transactionRepository.create(clonedPayloadTransaction);
        return wallet;
    }


    async withdraw(withdrawDto: WithdrawDto): Promise<Wallet> {
        const whereConditions: FindOptionsWhere<Wallet> = {};
        whereConditions.userId = withdrawDto.userId;
        let wallet = await this.walletRepository.findOneWithWhere({ whereConditions });
        if (!wallet || wallet.balance < withdrawDto.amount) {
            throw new Error('Insufficient balance');
        }

        const clonedPayload = {
            balance: wallet.balance -= withdrawDto.amount,
            ...plainToInstance(Wallet, withdrawDto),
        };
        this.logger.log(`withdraw withdrawDto.userId :: ${withdrawDto.userId}, depositDto.amount:: ${withdrawDto.amount}`);
        wallet = await this.walletRepository.create(clonedPayload);

        // await this.transactionRepository.save({
        //     userId: withdrawDto.userId,
        //     type: 'WITHDRAW',
        //     amount: withdrawDto.amount,
        // });
        return wallet;
    }

    async getBalance(userId: string): Promise<{ userId: string; balance: number }> {
        const whereConditions: FindOptionsWhere<Wallet> = {};
        whereConditions.userId = userId;
        let wallet = await this.walletRepository.findOneWithWhere({ whereConditions });
        return { userId, balance: wallet ? wallet.balance : 0 };
    }

    async getUserTransactions(userId: string) {
        const whereConditions: FindOptionsWhere<Wallet> = {};
        whereConditions.userId = userId;
        const sortOptions: SortTransactionDto[] = [{ orderBy: 'id', order: 'ASC' }];
        return this.transactionRepository.findWithWhere({
            sortOptions,
            whereConditions,
        });
    }
}
