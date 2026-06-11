import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WeighingsService } from './weighings.service';
import { Weighing } from '../entities/weighing.entity';

@Controller('weighings')
export class WeighingsController {
  constructor(private readonly weighingsService: WeighingsService) {}

  @Post()
  create(@Body() weighingData: Partial<Weighing>) {
    return this.weighingsService.create(weighingData);
  }

  @Get()
  findAll() {
    return this.weighingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weighingsService.findOne(id);
  }
}
