import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('bet', )
export class BetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  marketId: string;

  @Column({ type: 'enum', enum: ['YES', 'NO'] })
  outcome: 'YES' | 'NO';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
}
