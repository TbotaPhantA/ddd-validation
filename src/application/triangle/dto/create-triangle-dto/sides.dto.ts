import { SideDto } from './side.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SidesDto {
  @ApiProperty({ type: SideDto })
  readonly sideA: SideDto;

  @ApiProperty({ type: SideDto })
  readonly sideB: SideDto;

  @ApiProperty({ type: SideDto })
  readonly sideC: SideDto;
}
