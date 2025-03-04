import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('market_history')
export class MarketHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marketId: number;

  @Column()
  outcome: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  probability: number;

  @CreateDateColumn()
  timestamp: Date;
}
