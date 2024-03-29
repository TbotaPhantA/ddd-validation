import { NameDto } from './name.dto';
import { SidesDto } from './sides.dto';
import { Triangle } from '../../../../domain/triangle/triangle';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTriangleOutputDto {
  @ApiProperty({ example: '1dcf8739-1ee4-4740-acaf-24947c571d92' })
  id: string;

  @ApiProperty({ type: NameDto })
  name: NameDto;

  @ApiProperty({ type: SidesDto })
  sides: SidesDto;

  public static from(triangle: Triangle): CreateTriangleOutputDto {
    const dto = new CreateTriangleOutputDto();

    dto.id = triangle.id;

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
