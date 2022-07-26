import { ApiProperty } from '@nestjs/swagger';

export class NameDto {
  @ApiProperty({ example: 'John' })
  name: string;
}
