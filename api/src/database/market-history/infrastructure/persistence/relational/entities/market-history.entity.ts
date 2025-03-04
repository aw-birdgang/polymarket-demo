import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('market_history')
export class MarketHistoryEntity {
  @ApiProperty({ description: '자동 생성되는 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '연결된 Market 의 UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @Column({ type: 'uuid', nullable: false }) // ✅ `string` UUID 저장
  marketId: string;

  @ApiProperty({ description: '예측 결과(팀, 선수 등)', example: 'Boston Bruins' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  outcome: string;

  @ApiProperty({ description: '확률 (%)', example: 55.4 })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  probability: number;

  @ApiProperty({ description: '데이터가 기록된 시간', example: '2025-03-04T12:00:00Z' })
  @Column({ type: 'timestamp', nullable: false }) // ✅ 명시적 설정
  timestamp: Date;
}
