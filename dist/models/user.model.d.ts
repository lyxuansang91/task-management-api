import mongoose, { Document } from "mongoose";
export type UserDocument = User & Document;
export declare enum UserRole {
    Employer = "Employer",
    Employee = "Employee"
}
export declare class User {
    name: string;
    email: string;
    password: string;
    role: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
