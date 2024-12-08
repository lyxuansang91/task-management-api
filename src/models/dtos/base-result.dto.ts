import { ApiProperty } from '@nestjs/swagger';

export class BaseResult<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  success = true;

  @ApiProperty()
  errors: Record<string, string[]>;
}
