import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {EventEntity} from "../../../../../event/infrastructure/persistence/relational/entities/event.entity";
import {TradeEntity} from "../../../../../trade/infrastructure/persistence/relational/entities/trade.entity";
import {BetEntity} from "../../../../../bet/infrastructure/persistence/relational/entities/bet.entity";
import {CommentEntity} from "../../../../../comment/infrastructure/persistence/relational/entities/comment.entity";

@Entity('market')
export class MarketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string; // 예측 질문

  @Column({ type: 'enum', enum: ['BINARY', 'MULTIPLE'], default: 'BINARY' })
  type: 'BINARY' | 'MULTIPLE'; // 마켓 유형 (Binary: Yes/No, Multiple: 여러 선택지)

  @Column({ type: 'timestamp', nullable: true })
  openTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  closeTime: Date;

  @Column({ type: 'json', nullable: true })
  outcomes: string[];

  @Column({ type: 'decimal', default: 0 })
  yesOdds: number; // Yes 배당률 (이진 선택일 경우)

  @Column({ type: 'decimal', default: 0 })
  noOdds: number; // No 배당률 (이진 선택일 경우)

  @Column({ type: 'json', nullable: true })
  outcomeOdds: Record<string, number>; // 다중 선택 시장의 배당률 예: { "Trump": 45, "Biden": 40, "DeSantis": 15 }

  @Column({ default: false })
  isResolved: boolean; // 시장 종료 여부

  @Column({ nullable: true })
  resolvedOutcome: string | null; // 확정된 결과 (이진 선택: 'YES' or 'NO', 다중 선택: 'Trump', 'Biden' 등)

  @ManyToOne(() => EventEntity, (event) => event.markets, { onDelete: 'CASCADE' })
  event: EventEntity; // 해당 마켓이 속한 이벤트

  @OneToMany(() => TradeEntity, (trade) => trade.market)
  trades: TradeEntity[];

  @OneToMany(() => BetEntity, (bet) => bet.market)
  bets: BetEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.market)
  comments: CommentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
