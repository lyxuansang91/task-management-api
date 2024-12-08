import { AuthService } from "./auth.service";
import { NextFunction } from "express";
import { CreateUserDto } from "./dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: CreateUserDto): Promise<{
        success: boolean;
        data: import("mongoose").FlattenMaps<import("mongoose").LeanDocument<any>>;
    }>;
    login(body: any, next: NextFunction): Promise<{
        errors: {
            message: string;
        };
        success?: undefined;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            accessToken: string;
        };
        errors?: undefined;
    }>;
}
