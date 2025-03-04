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

    // 베팅을 생성하는 메서드
    // placeBetDto로 받은 데이터를 Bet 엔티티로 변환하여 저장
    async placeBet(placeBetDto: PlaceBetDto): Promise<Bet> {
        const clonedPayload = {
            ...plainToInstance(Bet, placeBetDto),
        };
        this.logger.log(`placeBetDto.marketId :: ${placeBetDto.marketId}, placeBetDto.amount:: ${placeBetDto.amount}`);
        return await this.betRepository.create(clonedPayload);
    }

    // marketId로 베팅 목록을 조회하는 메서드
    // 특정 마켓에 대한 모든 베팅을 반환
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

    // userId로 베팅 목록을 조회하는 메서드
    // 특정 사용자의 모든 베팅을 반환
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
