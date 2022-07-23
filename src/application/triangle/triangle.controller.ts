import { Body, Controller, Post } from '@nestjs/common';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { TriangleService } from './triangle.service';

@Controller('triangle')
export class TriangleController {
  constructor(private readonly triangleService: TriangleService) {}

  @Post()
  public create(@Body() dto: CreateTriangleInputDto) {
    return this.triangleService.create(dto);
  }
}
