import {ApiProperty} from "@nestjs/swagger";
import {Trade} from "../../trade/domain/trade";
import {Bet} from "../../bet/domain/bet";
import {Comment} from "../../comment/domain/comment";

export class Market {
    @ApiProperty({
        type: String,
        description: '고유 아이디 (UUID 형식)',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    })
    id: string;

    @ApiProperty({ description: '예측 질문', example: 'Who will win the presidency in 2024?' })
    question: string;

    @ApiProperty({ description: '마켓 유형 (BINARY: Yes/No, MULTIPLE: 여러 선택지)', enum: ['BINARY', 'MULTIPLE'], example: 'BINARY' })
    type: 'BINARY' | 'MULTIPLE';

    @ApiProperty({ description: '마켓 시작 시간 (언제부터 베팅 가능?)', example: '2025-01-01T00:00:00Z' })
    openTime: Date;

    @ApiProperty({ description: '마켓 마감 시간 (언제까지 베팅 가능?)', example: '2025-11-05T23:59:59Z' })
    closeTime: Date;

    @ApiProperty({
        description: '이 마켓이 속한 이벤트의 ID. Market은 특정 Event에 소속됨.',
        example: 'event_12345',
    })
    eventId: string;

    @ApiProperty({ description: '다중 선택 시장일 경우 가능한 결과 목록', example: ['Trump', 'Biden', 'DeSantis'], nullable: true })
    outcomes: string[]; // 다중 선택 시장일 경우 가능한 결과 목록

    @ApiProperty({ description: 'Yes 배당률 (BINARY 시장 에서 사용)', example: 0.55 })
    yesOdds: number;

    @ApiProperty({ description: 'No 배당률 (BINARY 시장 에서 사용)', example: 0.45 })
    noOdds: number;

    @ApiProperty({ description: '다중 선택 시장 배당률', example: { "Trump": 45, "Biden": 40, "DeSantis": 15 }, nullable: true })
    outcomeOdds: Record<string, number>;

    @ApiProperty({ description: '마켓이 종료되었는지 여부', example: false })
    isResolved: boolean;

    @ApiProperty({ description: '확정된 결과 (BINARY: YES/NO, MULTIPLE: 선택된 후보)', example: 'Biden', nullable: true })
    resolvedOutcome: string | null;

    @ApiProperty({ description: '이 마켓이 속한 이벤트', example: 1 })
    event: Event;

    @ApiProperty({ description: '거래 내역 리스트', type: () => [Trade] })
    trades: Trade[];

    @ApiProperty({ description: '베팅 내역 리스트', type: () => [Bet] })
    bets: Bet[];

    @ApiProperty({ description: '댓글 리스트', type: () => [Comment] })
    comments: Comment[];

    @ApiProperty({ description: '생성된 날짜', example: '2025-03-04T12:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: '마지막 업데이트 날짜', example: '2025-03-04T15:00:00Z' })
    updatedAt: Date;
}
