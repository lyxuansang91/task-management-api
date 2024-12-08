import { PaginationDto } from './pagination.dto';
export declare class BaseResultPagination<T> {
    data: PaginationDto<T>;
    success: boolean;
    errors: Record<string, string[]>;
}
