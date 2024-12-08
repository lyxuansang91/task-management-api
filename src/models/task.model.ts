import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TaskDocument = Task & Document;

@Schema({
  collection: "tasks",
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
    getters: true,
  },
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  assignee: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Date })
  dueDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
