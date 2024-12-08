"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const decorators_1 = require("../decorators");
const models_1 = require("../models");
const swagger_1 = require("@nestjs/swagger");
let TasksController = class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async createTask(dto) {
        return this.taskService.createTask(dto);
    }
    async getTasks(filter) {
        return this.taskService.getTasks(filter);
    }
    async getMyTasks(assignee) {
        return this.taskService.getTasks({ assignee });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(models_1.UserRole.Employer),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Roles)(models_1.UserRole.Employee),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)("/my-tasks"),
    (0, decorators_1.Roles)(models_1.UserRole.Employee),
    __param(0, (0, common_1.Query)("assignee")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getMyTasks", null);
TasksController = __decorate([
    (0, common_1.Controller)("tasks"),
    (0, swagger_1.ApiTags)("tasks"),
    (0, swagger_1.ApiBearerAuth)("JWT"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=task.controller.js.map