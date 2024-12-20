import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskSchema, Task, UserSchema, User } from "../models";
import { TaskService } from "./task.service";
import { TasksController } from "./task.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TaskModule {}
