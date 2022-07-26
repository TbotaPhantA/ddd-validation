import { SideDto } from './side.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SidesDto {
  @ApiProperty({ type: SideDto })
  sideA: SideDto;

  @ApiProperty({ type: SideDto })
  sideB: SideDto;

  @ApiProperty({ type: SideDto })
  sideC: SideDto;
}
