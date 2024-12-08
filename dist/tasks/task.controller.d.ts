import { TaskService } from "./task.service";
export declare class TasksController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(dto: any): Promise<import("../models").Task & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getTasks(filter: any): Promise<(import("../models").Task & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getMyTasks(assignee: string): Promise<(import("../models").Task & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
