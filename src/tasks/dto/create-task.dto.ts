import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({
    required: false,
    description: "status of task",
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  })
  status: string;
  @ApiProperty({
    required: true,
  })
  assignee: string;

  @ApiProperty({ required: true })
  dueDate: Date;
}
