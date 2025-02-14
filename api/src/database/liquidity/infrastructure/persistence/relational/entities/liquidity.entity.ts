import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('liquidity', )
export class LiquidityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  marketId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
}
