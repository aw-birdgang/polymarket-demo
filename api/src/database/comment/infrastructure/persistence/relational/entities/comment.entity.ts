import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {MarketEntity} from "../../../../../market/infrastructure/persistence/relational/entities/market.entity";

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  marketId: string;

  @ManyToOne(() => MarketEntity, (market) => market.comments, { onDelete: 'CASCADE' })
  market: MarketEntity;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
