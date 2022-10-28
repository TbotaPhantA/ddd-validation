import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTriangleDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  id: string;
}
