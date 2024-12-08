export declare class BaseResult<T> {
    data: T;
    success: boolean;
    errors: Record<string, string[]>;
}
