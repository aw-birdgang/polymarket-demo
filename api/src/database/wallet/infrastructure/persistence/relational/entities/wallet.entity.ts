import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('wallet', )
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;
}

