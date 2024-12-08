import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../decorators";
import { UserRole } from "../models";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("tasks")
@ApiTags("tasks")
@ApiBearerAuth("JWT")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Post()
  @Roles(UserRole.Employer)
  async createTask(@Body() dto: any) {
    return this.taskService.createTask(dto);
  }

  @Get()
  @Roles(UserRole.Employee)
  async getTasks(@Query() filter: any) {
    return this.taskService.getTasks(filter);
  }

  @Get("/my-tasks")
  @Roles(UserRole.Employee)
  async getMyTasks(@Query("assignee") assignee: string) {
    return this.taskService.getTasks({ assignee });
  }
}
