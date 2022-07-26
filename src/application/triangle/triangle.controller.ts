import { Body, Controller, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { TriangleService } from './triangle.service';
import { AllExceptionFilter } from '../shared/filters/all-exception-filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTriangleOutputDto } from './dto/create-triangle-dto/create-triangle-output.dto';

@Controller('triangle')
@ApiTags('triangle')
@UseFilters(AllExceptionFilter)
export class TriangleController {
  constructor(private readonly triangleService: TriangleService) {}

  @Post()
  @ApiOperation({ summary: 'Create Triangle' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created Triangle',
    type: CreateTriangleOutputDto,
  })
  public async create(
    @Body() dto: CreateTriangleInputDto,
  ): Promise<CreateTriangleOutputDto> {
    return this.triangleService.create(dto);
  }
}
