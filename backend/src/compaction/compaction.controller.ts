import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompactionService } from './compaction.service';
import { Compaction } from '../entities/compaction.entity';

@Controller('compaction')
export class CompactionController {
  constructor(private readonly compactionService: CompactionService) {}

  @Post()
  create(@Body() data: Partial<Compaction>) {
    return this.compactionService.create(data);
  }

  @Get()
  findAll() {
    return this.compactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compactionService.findOne(id);
  }
}
