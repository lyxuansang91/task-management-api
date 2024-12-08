import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

export class BaseResultPagination<T> {
  @ApiProperty()
  data: PaginationDto<T>;

  @ApiProperty()
  success = true;

  @ApiProperty()
  errors: Record<string, string[]>;
}
