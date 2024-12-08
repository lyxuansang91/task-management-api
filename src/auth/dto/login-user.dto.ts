import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;
}
