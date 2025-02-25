import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    SerializeOptions,
} from '@nestjs/common';
import {EventService} from './event.service';
import {CreateEventDto} from './dto/create-event.dto';
import {UpdateEventDto} from './dto/update-event.dto';
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {NullableType} from '../common/utils/types/nullable.type';
import {InfinityPaginationResponseDto} from "../common/utils/dto/infinity-pagination-response.dto";
import {infinityPagination} from "../common/utils/infinity-pagination";
import {QueryEventDto} from "../database/event/dto/query-event.dto";
import {Event} from "../database/event/domain/event";


@ApiTags('EVENT')
@Controller({
    path: 'event',
    version: '1',
})
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @ApiCreatedResponse({
        type: Event,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createEvent(
        @Body() createEventDto: CreateEventDto
    ){
        return this.eventService.createEvent(createEventDto);
    }


    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async findAllAndPaging(
        @Query() query: QueryEventDto,
    ): Promise<InfinityPaginationResponseDto<Event>> {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const paginationResult = await this.eventService.findManyWithPagination({
            filterOptions: query?.filters,
            sortOptions: query?.sort,
            paginationOptions: {
                page,
                limit,
            },
        });
        return infinityPagination(paginationResult, { page, limit });
    }


    @Get(':id')
    @ApiOperation({ summary: '이벤트 상세 조회' })
    @ApiResponse({ status: 200, description: '이벤트 상세 정보 반환', type: Event })
    @ApiResponse({ status: 404, description: '이벤트를 찾을 수 없습니다.' })
    async getEventById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<NullableType<Event>> {
        return this.eventService.getEventById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: '이벤트 수정' })
    @ApiResponse({ status: 200, description: '이벤트가 성공적으로 수정 되었습니다.', type: Event })
    async updateEvent(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateEventDto: UpdateEventDto,
    ): Promise<Event | null> {
        return this.eventService.updateEvent(id, updateEventDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '이벤트 삭제' })
    @ApiResponse({ status: 200, description: '이벤트가 성공적으로 삭제되었습니다.' })
    async deleteEvent(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.eventService.deleteEvent(id);
    }
}
