import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @Min(1)
  page = 1;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  size = 10;
}
