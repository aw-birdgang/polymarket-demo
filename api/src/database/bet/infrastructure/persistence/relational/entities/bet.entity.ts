import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {MarketEntity} from "../../../../../market/infrastructure/persistence/relational/entities/market.entity";

@Entity('bet', )
export class BetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  marketId: string;

  @ManyToOne(() => MarketEntity, (market) => market.bets, { onDelete: 'CASCADE' })
  market: MarketEntity;

  @Column({ type: 'decimal' })
  betAmount: number;

  @Column({ type: 'enum', enum: ['YES', 'NO', 'MULTIPLE'] })
  betOn: 'YES' | 'NO' | 'MULTIPLE';

  @CreateDateColumn()
  createdAt: Date;
}
