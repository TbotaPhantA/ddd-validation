import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { AllExceptionFilter } from '../shared/filters/all-exception-filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTriangleOutputDto } from './dto/create-triangle-dto/create-triangle-output.dto';
import { UpdateTriangleInputDto } from './dto/update-triangle-dto/update-triangle-input.dto';
import { UpdateTriangleOutputDto } from './dto/update-triangle-dto/update-triangle-output.dto';
import { UpdateShipmentParamsDto } from './dto/update-triangle-dto/update-shipment-params.dto';
import { TriangleCreateService } from './services/triangle-create.service';
import { TriangleUpdateService } from './services/triangle-update.service';
import { Triangle } from '../../domain/triangle/triangle';
import { GetTriangleDto } from './dto/get-triangle-dto/get-triangle.dto';
import { TriangleReadService } from './services/triangle-read.service';

@Controller('triangle')
@ApiTags('triangle')
@UseFilters(AllExceptionFilter)
export class TriangleController {
  constructor(
    private readonly triangleReadService: TriangleReadService,
    private readonly triangleCreateService: TriangleCreateService,
    private readonly triangleUpdateService: TriangleUpdateService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Triangle' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateTriangleOutputDto,
  })
  public async getById(@Query() { id }: GetTriangleDto): Promise<Triangle> {
    return this.triangleReadService.getOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Triangle' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateTriangleOutputDto,
  })
  public async create(
    @Body() dto: CreateTriangleInputDto,
  ): Promise<CreateTriangleOutputDto> {
    return this.triangleCreateService.create(dto);
  }

  @Put(':triangleId')
  @ApiOperation({ summary: 'Update Triangle' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Triangle',
    type: UpdateTriangleOutputDto,
  })
  public async update(
    @Param() { triangleId }: UpdateShipmentParamsDto,
    @Body() dto: UpdateTriangleInputDto,
  ): Promise<UpdateTriangleOutputDto> {
    return this.triangleUpdateService.update(triangleId, dto);
  }
}
