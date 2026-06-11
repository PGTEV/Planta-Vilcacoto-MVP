import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { Treatment } from '../entities/treatment.entity';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  create(@Body() treatmentData: Partial<Treatment>) {
    return this.treatmentsService.create(treatmentData);
  }

  @Get()
  findAll() {
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(id);
  }
}
