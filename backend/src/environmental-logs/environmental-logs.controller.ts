import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EnvironmentalLogsService } from './environmental-logs.service';
import { EnvironmentalLog } from '../entities/environmental-log.entity';

@Controller('environmental-logs')
export class EnvironmentalLogsController {
  constructor(private readonly logsService: EnvironmentalLogsService) {}

  @Post()
  create(@Body() logData: Partial<EnvironmentalLog>) {
    return this.logsService.create(logData);
  }

  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(id);
  }
}
