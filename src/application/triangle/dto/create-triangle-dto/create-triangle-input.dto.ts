import { NameDto } from './name.dto';
import { SidesDto } from './sides.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTriangleInputDto {
  @ApiProperty({ type: NameDto })
  name: NameDto;

  @ApiProperty({ type: SidesDto })
  sides: SidesDto;
}
