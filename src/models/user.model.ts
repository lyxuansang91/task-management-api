import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document, now } from "mongoose";

export type UserDocument = User & Document;

export enum UserRole {
  Employer = "Employer",
  Employee = "Employee",
}

@Schema({
  collection: "users",
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    },
    getters: true,
  },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.Employee })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
