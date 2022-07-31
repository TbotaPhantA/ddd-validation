import { PartialType } from '@nestjs/swagger';
import { CreateTriangleInputDto } from '../create-triangle-dto/create-triangle-input.dto';

export class UpdateTriangleInputDto extends PartialType(
  CreateTriangleInputDto,
) {}
