import {Injectable, Logger} from '@nestjs/common';
import {PlaceBetDto} from './dto/place-bet.dto';
import {BetRepository} from "../database/bet/infrastructure/persistence/bet.repository";
import {FindOptionsWhere} from "typeorm";
import {Bet} from "../database/bet/domain/bet";
import {plainToInstance} from "class-transformer";

@Injectable()
export class BetService {
    constructor(
        private readonly betRepository: BetRepository,
    ) {}

    private readonly logger = new Logger(BetService.name);

    async placeBet(placeBetDto: PlaceBetDto): Promise<Bet> {
        const clonedPayload = {
            ...plainToInstance(Bet, placeBetDto),
        };
        this.logger.log(`placeBetDto.marketId :: ${placeBetDto.marketId}, placeBetDto.amount:: ${placeBetDto.amount}`);
        return await this.betRepository.create(clonedPayload);
    }

    async getBetsByMarketId(marketId: string) {
        const whereConditions: FindOptionsWhere<Bet> = {};
        this.logger.log(`getBetsByMarketId >> marketId: ${marketId}`);
        if (marketId) {
            whereConditions.marketId = marketId;
        }
        const districts = await this.betRepository.findWithWhere({
            whereConditions,
        });
        return districts;
    }

    async getBetsByUserId(userId: string): Promise<Bet[]> {
        const whereConditions: FindOptionsWhere<Bet> = {};
        this.logger.log(`getBetsByUserId >> userId: ${userId}`);
        if (userId) {
            whereConditions.userId = userId;
        }
        const districts = await this.betRepository.findWithWhere({
            whereConditions,
        });
        return districts;
    }
}
