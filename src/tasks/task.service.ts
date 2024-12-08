import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "../models";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(dto: any) {
    const task = new this.taskModel(dto);
    return task.save();
  }

  async getTasks(filter: any) {
    const query = {};
    if (filter.status) query["status"] = filter.status;
    if (filter.assignee) query["assignee"] = filter.assignee;
    return this.taskModel.find(query).exec();
  }
}
