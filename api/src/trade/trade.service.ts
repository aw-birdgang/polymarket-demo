import {Injectable, Logger} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {IPaginationOptions} from "../common/utils/types/pagination-options";
import {NullableType} from "../common/utils/types/nullable.type";
import {TradeRepository} from "../database/trade/infrastructure/persistence/trade.repository";
import {CreateTradeDto} from "./dto/create-trade.dto";
import {Trade} from "../database/trade/domain/trade";
import {FilterTradeDto, SortTradeDto} from "../database/trade/dto/query-trade.dto";

@Injectable()
export class TradeService {
    constructor(
        private readonly tradeRepository: TradeRepository,
    ) {}

    private readonly logger = new Logger(TradeService.name);

    async createTrade(createTradeDto: CreateTradeDto): Promise<Trade> {
        const clonedPayload = {
            ...plainToInstance(Trade, createTradeDto),
        };
        this.logger.log(`createTradeDto.amount :: ${createTradeDto.amount}, createTradeDto.price:: ${createTradeDto.price}`);
        return await this.tradeRepository.create(clonedPayload);
    }

    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterTradeDto | null;
        sortOptions?: SortTradeDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Trade>> {
        return this.tradeRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }

    async getTradeById(id: string): Promise<NullableType<Trade>> {
        return this.tradeRepository.findById(id);
    }

    async deleteTrade(id: Trade['id'],): Promise<void> {
        return await this.tradeRepository.remove(id,);
    }
}
