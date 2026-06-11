import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SegregationsService } from './segregations.service';
import { Segregation } from '../entities/segregation.entity';

@Controller('segregations')
export class SegregationsController {
  constructor(private readonly segregationsService: SegregationsService) {}

  @Post()
  create(@Body() segregationData: Partial<Segregation>) {
    return this.segregationsService.create(segregationData);
  }

  @Get()
  findAll() {
    return this.segregationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segregationsService.findOne(id);
  }
}
