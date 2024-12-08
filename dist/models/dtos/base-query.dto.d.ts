import { PaginationQueryDto } from './pagination-query.dto';
export declare class BaseQueryParams extends PaginationQueryDto {
    search: string;
    orderBy: string;
    desc: boolean;
}
