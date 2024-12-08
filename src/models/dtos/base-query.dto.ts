import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { PaginationQueryDto } from './pagination-query.dto';

export class BaseQueryParams extends PaginationQueryDto {
  @ApiProperty({ required: false, nullable: true })
  search: string;

  @ApiProperty({ required: false, nullable: true })
  orderBy: string;

  @ApiProperty({ required: false, nullable: true })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  desc = false;
}
