import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { AppConfiguration } from "src/config/configuration";
import { UserDocument } from "src/models/user.model";
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    private appConfiguration;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, appConfiguration: AppConfiguration);
    register(name: string, email: string, password: string, role: string): Promise<UserDocument>;
    validateUser(email: string, password: string): Promise<UserDocument>;
    login(user: UserDocument): Promise<string>;
}
