import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {MarketEntity} from "../../../../../market/infrastructure/persistence/relational/entities/market.entity";

@Entity('trade')
export class TradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => MarketEntity, (market) => market.trades, { onDelete: 'CASCADE' })
  market: MarketEntity;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'enum', enum: ['BUY', 'SELL'] })
  tradeType: 'BUY' | 'SELL';

  @CreateDateColumn()
  createdAt: Date;
}
