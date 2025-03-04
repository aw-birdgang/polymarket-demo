import {Injectable, Logger} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {IPaginationOptions} from "../common/utils/types/pagination-options";
import {NullableType} from "../common/utils/types/nullable.type";
import {CreateMarketHistoryDto} from "./dto/create-market-history.dto";
import {MarketHistoryRepository} from "../database/market-history/infrastructure/persistence/market-history.repository";
import {MarketHistory} from "../database/market-history/domain/market-history";
import {FilterMarketHistoryDto, SortMarketHistoryDto} from "../database/market-history/dto/query-market-history.dto";

@Injectable()
export class MarketHistoryService {
    constructor(
        private readonly marketHistoryRepository: MarketHistoryRepository,
    ) {}

    private readonly logger = new Logger(MarketHistoryService.name);

    async createMarketHistory(createMarketHistoryDto: CreateMarketHistoryDto): Promise<MarketHistory> {
        const clonedPayload = {
            ...plainToInstance(MarketHistory, createMarketHistoryDto),
        };
        this.logger.log(`createMarketHistoryDto.marketId :: ${createMarketHistoryDto.marketId}, createMarketHistoryDto.outcome:: ${createMarketHistoryDto.outcome}`);
        return await this.marketHistoryRepository.create(clonedPayload);
    }

    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterMarketHistoryDto | null;
        sortOptions?: SortMarketHistoryDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<MarketHistory>> {
        return this.marketHistoryRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }

    async getMarketHistoryById(id: MarketHistory['id']): Promise<NullableType<MarketHistory>> {
        return this.marketHistoryRepository.findById(id);
    }

    async updateMarketHistory(id: MarketHistory['id'],): Promise<MarketHistory | null> {
        const marketHistory = await this.marketHistoryRepository.findById(id);
        if (!marketHistory) {
            throw new Error('MarketHistory not found');
        }
        const clonedPayload = { ...marketHistory };
        return await this.marketHistoryRepository.update(id, clonedPayload);
    }

}
