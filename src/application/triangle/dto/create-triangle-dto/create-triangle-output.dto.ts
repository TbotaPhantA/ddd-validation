import { NameDto } from './name.dto';
import { SidesDto } from './sides.dto';
import { Triangle } from '../../../../domain/triangle/triangle';

export class CreateTriangleOutputDto {
  name: NameDto;

  sides: SidesDto;

  public static from(triangle: Triangle): CreateTriangleOutputDto {
    const dto = new CreateTriangleOutputDto();

    dto.name = {
      name: triangle.name.name,
    };

    dto.sides = {
      sideA: {
        length: triangle.sides.sideA.length,
      },

      sideB: {
        length: triangle.sides.sideB.length,
      },

      sideC: {
        length: triangle.sides.sideC.length,
      },
    };

    return dto;
  }
}
