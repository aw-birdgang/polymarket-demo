import {Injectable, Logger} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {IPaginationOptions} from "../common/utils/types/pagination-options";
import {NullableType} from "../common/utils/types/nullable.type";
import {EventRepository} from "../database/event/infrastructure/persistence/event.repository";
import {FilterEventDto, SortEventDto} from "../database/event/dto/query-event.dto";
import {CreateEventDto} from "./dto/create-event.dto";
import {Event} from "../database/event/domain/event";
import {UpdateEventDto} from "./dto/update-event.dto";

@Injectable()
export class EventService {
    constructor(
        private readonly eventRepository: EventRepository,
    ) {}

    private readonly logger = new Logger(EventService.name);

    async createEvent(createEventDto: CreateEventDto): Promise<Event> {
        const clonedPayload = {
            ...plainToInstance(Event, createEventDto),
        };
        this.logger.log(`createEventDto.title :: ${createEventDto.title}, createEventDto.volume:: ${createEventDto.volume}`);
        return await this.eventRepository.create(clonedPayload);
    }

    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterEventDto | null;
        sortOptions?: SortEventDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Event>> {
        return this.eventRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }

    async getEventById(id: Event['id']): Promise<NullableType<Event>> {
        return this.eventRepository.findById(id);
    }

    async updateEvent(id: Event['id'], updateEventDto: UpdateEventDto,): Promise<Event | null> {
        const market = await this.eventRepository.findById(id);
        if (!market) {
            throw new Error('Event not found');
        }
        const clonedPayload = {
            ...plainToInstance(Event, updateEventDto),
        };
        return await this.eventRepository.update(id, clonedPayload);
    }

    async deleteEvent(id: Event['id'],): Promise<void> {
        return await this.eventRepository.remove(id,);
    }
}
