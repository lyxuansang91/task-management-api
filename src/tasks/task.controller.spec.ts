import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { TasksController } from "./task.controller";
import { TaskService } from "./task.service";
import { Task, TaskSchema, User, UserSchema } from "../models";
import {
  describe,
  it,
  beforeAll,
  afterAll,
  afterEach,
  expect,
} from "@jest/globals";
import mongoose, { Connection } from "mongoose";

describe("TasksController (with real MongoDB)", () => {
  let module: TestingModule;
  let controller: TasksController;
  let service: TaskService;
  let mongoServer: MongoMemoryServer;
  let connection: Connection; // Store connection

  beforeAll(async () => {
    // Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Task.name, schema: TaskSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      controllers: [TasksController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TaskService>(TaskService);
    connection = module.get(getConnectionToken());
  });

  afterAll(async () => {
    await module.close();
    await connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    const collections = connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  it("should create a new task", async () => {
    const assignee = new mongoose.Types.ObjectId("6755a1f4bc117ba6818637a4");
    const user = {
      id: assignee,
      sub: assignee,
      name: "Employer1",
      email: "user@email.com",
    };
    const newTask = {
      title: "Test Task",
      description: "This is a test",
      assignee: user.id.toString(),
      dueDate: new Date(),
      status: "Pending",
    };

    const createdTask = await controller.createTask(newTask, { user });
    expect(createdTask).toHaveProperty("success");
    expect(createdTask).toHaveProperty("data");
  });

  it("should return tasks", async () => {
    const assignee = new mongoose.Types.ObjectId("6755a1f4bc117ba6818637a4");
    const user = {
      id: assignee,
      sub: assignee,
      name: "Employer1",
      email: "user@email.com",
    };
    const task1 = {
      title: "Task 1",
      description: "Test 1",
      assignee: user.id.toString(),
      dueDate: new Date(),
      status: "Pending",
    };
    const task2 = {
      title: "Task 2",
      description: "Test 2",
      assignee: user.id.toString(),
      dueDate: new Date(),
      status: "Pending",
    };

    await controller.createTask(task1, { user });
    await controller.createTask(task2, { user });

    const data = await controller.getTasks({});
    expect(data).toHaveProperty("success");
    expect(data).toHaveProperty("data");
    expect(data.data).toHaveProperty("tasks");
    expect(data.data.tasks).toHaveLength(2);
  });

  it("should return an empty summary if no tasks exist", async () => {
    const summary = await service.getEmployeeTaskSummary();
    expect(summary).toEqual([]);
  });

  it("should return a correct summary for tasks assigned to employees", async () => {
    const users = await Promise.all([
      service["userModel"].create({
        name: "Alice",
        email: "alice@example.com",
        password: "password",
        role: "Employee",
      }),
      service["userModel"].create({
        name: "Bob",
        email: "bob@example.com",
        password: "password",
        role: "Employee",
      }),
    ]);

    await Promise.all([
      service["taskModel"].create({
        title: "Task 1",
        status: "Completed",
        description: "description 1",
        assignee: users[0]._id,
        dueDate: new Date(),
        createdBy: users[1]._id,
      }),
      service["taskModel"].create({
        title: "Task 2",
        status: "Pending",
        description: "description 2",
        assignee: users[0]._id,
        dueDate: new Date(),
        createdBy: users[1]._id,
      }),
      service["taskModel"].create({
        title: "Task 3",
        description: "description 3",
        status: "Completed",
        assignee: users[1]._id,
        dueDate: new Date(),
        createdBy: users[0]._id,
      }),
    ]);

    const response = await controller.getEmployeeTaskSummary();
    expect(response).toHaveProperty("success");
    expect(response).toHaveProperty("data");
    const { data } = response;

    const summary = await service.getEmployeeTaskSummary();

    expect(data).toEqual(summary);

    expect(summary).toEqual(
      expect.arrayContaining([
        {
          employeeName: "Alice",
          employeeEmail: "alice@example.com",
          totalTasks: 2,
          completedTasks: 1,
        },
        {
          employeeName: "Bob",
          employeeEmail: "bob@example.com",
          totalTasks: 1,
          completedTasks: 1,
        },
      ])
    );
  });
});
