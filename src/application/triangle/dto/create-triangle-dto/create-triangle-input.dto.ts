import { NameDto } from './name.dto';
import { SidesDto } from './sides.dto';

export class CreateTriangleInputDto {
  name: NameDto;
  sides: SidesDto;
}
