import { Controller, Get, Post, Body } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Storage } from '../entities/storage.entity';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  create(@Body() data: Partial<Storage>) {
    return this.storageService.create(data);
  }

  @Get()
  findAll() {
    return this.storageService.findAll();
  }
}
