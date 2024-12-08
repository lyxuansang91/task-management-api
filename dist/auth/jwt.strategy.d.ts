import { Model } from "mongoose";
import { Strategy } from "passport-jwt";
import { AppConfiguration } from "src/config/configuration";
import { UserDocument, User } from "../models/user.model";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    private appConfiguration;
    constructor(userModel: Model<UserDocument>, appConfiguration: AppConfiguration);
    validate(payload: any): Promise<User>;
}
export {};
