import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CrushingService } from './crushing.service';
import { Crushing } from '../entities/crushing.entity';

@Controller('crushing')
export class CrushingController {
  constructor(private readonly crushingService: CrushingService) {}

  @Post()
  create(@Body() data: Partial<Crushing>) {
    return this.crushingService.create(data);
  }

  @Get()
  findAll() {
    return this.crushingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crushingService.findOne(id);
  }
}
