import { Controller, Get, Post, Body } from '@nestjs/common';
import { DisposalService } from './disposal.service';
import { Disposal } from '../entities/disposal.entity';

@Controller('disposal')
export class DisposalController {
  constructor(private readonly disposalService: DisposalService) {}

  @Post()
  create(@Body() data: Partial<Disposal>) {
    return this.disposalService.create(data);
  }

  @Get()
  findAll() {
    return this.disposalService.findAll();
  }
}
