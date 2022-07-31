import { ApiProperty } from '@nestjs/swagger';

export class SideDto {
  @ApiProperty({ example: 5 })
  readonly length: number;
}
