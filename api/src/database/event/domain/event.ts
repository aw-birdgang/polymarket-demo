import {ApiProperty} from "@nestjs/swagger";
import {Market} from "../../market/domain/market";

export class Event {
    @ApiProperty({
        type: String,
        description: '고유 아이디 (UUID 형식)',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    })
    id: string;

    @ApiProperty({ description: '이벤트 제목', example: '2024년 미국 대선' })
    title: string;

    @ApiProperty({ description: '이벤트 설명', example: '2024년 미국 대통령 선거의 승자를 예측하는 시장입니다.' })
    description: string;

    @ApiProperty({ description: '이벤트가 종료되었는지 여부', example: false })
    isResolved: boolean;

    @ApiProperty({ description: '이벤트 생성 시간', example: '2025-03-04T12:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: '이벤트 마지막 업데이트 시간', example: '2025-03-04T15:00:00Z' })
    updatedAt: Date;

    @ApiProperty({ description: '이 이벤트에 속한 마켓 목록', type: () => [Market] })
    markets: Market[];
}
