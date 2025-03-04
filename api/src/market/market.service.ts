import {Injectable, Logger} from '@nestjs/common';
import {CreateMarketDto} from './dto/create-market.dto';
import {MarketRepository} from "../database/market/infrastructure/persistence/market.repository";
import {Market} from "../database/market/domain/market";
import {plainToInstance} from "class-transformer";
import {IPaginationOptions} from "../common/utils/types/pagination-options";
import {FilterMarketDto, SortMarketDto} from "../database/market/dto/query-market.dto";
import {NullableType} from "../common/utils/types/nullable.type";

@Injectable()
export class MarketService {
    constructor(
        private readonly marketRepository: MarketRepository,
    ) {}

    private readonly logger = new Logger(MarketService.name);

    async createMarket(createMarketDto: CreateMarketDto): Promise<Market> {
        const clonedPayload = {
            ...plainToInstance(Market, createMarketDto),
        };
        this.logger.log(`createMarketDto.question :: ${createMarketDto.question}, createMarketDto.closeTime:: ${createMarketDto.closeTime}`);
        return await this.marketRepository.create(clonedPayload);
    }

    async findManyWithPagination({
       filterOptions,
       sortOptions,
       paginationOptions,
   }: {
        filterOptions?: FilterMarketDto | null;
        sortOptions?: SortMarketDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Market>> {
        return this.marketRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }

    async getMarketById(id: string): Promise<NullableType<Market>> {
        return this.marketRepository.findById(id);
    }

    async resolveMarket(id: Market['id'],): Promise<Market | null> {
        const market = await this.marketRepository.findById(id);
        if (!market) {
            throw new Error('Liquidity not found');
        }
        market.isResolved = true;
        const clonedPayload = { ...market };
        return await this.marketRepository.update(id, clonedPayload);
    }

}
