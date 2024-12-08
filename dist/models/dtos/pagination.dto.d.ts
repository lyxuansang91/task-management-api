export declare class PaginationDto<T> {
    total: number;
    currentPage: number;
    size: number;
    pages: number;
    items: T[];
    constructor();
    constructor(total: number, page: number, size: number);
    constructor(items: T[], total: number, page: number, size: number);
}
