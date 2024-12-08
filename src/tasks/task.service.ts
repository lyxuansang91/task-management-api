import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";
import { Task, User, TaskDocument, UserDocument } from "../models";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createTask(user: any, dto: CreateTaskDto) {
    if (!Types.ObjectId.isValid(dto.assignee)) {
      throw new BadRequestException("assignee is not valid");
    }
    const taskObject = {
      ...dto,
      createdBy: user._id || user.sub,
      assignee: new Types.ObjectId(dto.assignee),
    };
    const task = new this.taskModel(taskObject);
    return task.save();
  }

  async updateTask(
    user: UserDocument,
    { id, status }: any
  ): Promise<TaskDocument> {
    const oldTask: TaskDocument = await this.taskModel.findOne({ id });
    if (!oldTask) {
      throw new NotFoundException(`task with ${id} is not found`);
    }
    if (oldTask.assignee.toString() !== user._id.toString()) {
      throw new BadRequestException(`this task is not owned by ${user._id}`);
    }
    oldTask.status = status;
    return oldTask.save();
  }

  async getTasks(
    filter: any,
    { page, limit }: any,
    { sortBy, sortOrder }: { sortBy: string; sortOrder: "asc" | "desc" }
  ): Promise<any> {
    const skip = (page - 1) * limit;
    const query = {};
    if (filter.status) query["status"] = filter.status;
    if (filter.assignee) query["assignee"] = filter.assignee;
    const totalCounts = await this.taskModel.countDocuments(query);
    const tasks = await this.taskModel
      .find(query)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);
    return { tasks, page, limit, totalCounts };
  }

  async getEmployeeTaskSummary() {
    const summaries = await this.taskModel.aggregate([
      {
        $group: {
          _id: "$assignee",
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $project: {
          _id: 0,
          employeeName: "$employee.name",
          employeeEmail: "$employee.email",
          totalTasks: 1,
          completedTasks: 1,
        },
      },
    ]);

    return summaries;
  }
}
