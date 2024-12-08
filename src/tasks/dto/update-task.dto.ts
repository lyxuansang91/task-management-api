import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDto {
  @ApiProperty({
    required: false,
    description: "status of task",
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  })
  status: string;
}
