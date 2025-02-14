import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('market')
export class MarketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  question: string;

  @Column({ type: 'timestamp', nullable: false })
  endTime: Date;

  @Column({ type: 'boolean', default: false })
  resolved: boolean;

  @Column({ type: 'boolean', nullable: true, default: false  })
  outcome: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
