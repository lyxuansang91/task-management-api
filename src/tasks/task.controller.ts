import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  Param,
  Patch,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../decorators";
import { UserRole } from "../models";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@Controller("tasks")
@ApiTags("tasks")
@ApiBearerAuth("JWT")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Post()
  @Roles(UserRole.Employer)
  async createTask(@Body() body: CreateTaskDto, @Req() { user }: any) {
    return {
      success: true,
      data: await this.taskService.createTask(user, body),
    };
  }

  @Get()
  @Roles(UserRole.Employer)
  async getTasks(
    @Query() filter: any,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("sortBy") sortBy: string = "date",
    @Query("sortOrder") sortOrder: "asc" | "desc" = "asc"
  ) {
    return {
      success: true,
      data: await this.taskService.getTasks(
        filter,
        { page, limit },
        { sortBy, sortOrder }
      ),
    };
  }

  @Get("/my-tasks")
  @Roles(UserRole.Employer, UserRole.Employee)
  async getMyTasks(
    @Req() { user }: any,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("sortBy") sortBy: string = "date",
    @Query("sortOrder") sortOrder: "asc" | "desc" = "asc"
  ) {
    const assignee = user._id || user.sub;
    return {
      success: true,
      data: await this.taskService.getTasks(
        { assignee },
        { page, limit },
        { sortBy, sortOrder }
      ),
    };
  }

  @Patch("/:id")
  @ApiParam({ name: "id", required: true, description: "id of the task" })
  @Roles(UserRole.Employer, UserRole.Employee)
  async updateTaskStatus(
    @Req() { user }: any,
    @Param("id") { id }: { id: string },
    @Body() body: UpdateTaskDto
  ) {
    return {
      success: true,
      data: await this.taskService.updateTask(user, { id, ...body }),
    };
  }

  @Get("/employee-summary")
  @Roles(UserRole.Employer)
  @ApiResponse({
    status: 200,
    description: "Employee task summary retrieved successfully",
  })
  async getEmployeeTaskSummary() {
    return {
      success: true,
      data: await this.taskService.getEmployeeTaskSummary(),
    };
  }
}
