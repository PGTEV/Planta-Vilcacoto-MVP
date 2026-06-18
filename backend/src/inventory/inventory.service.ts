import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(data: Partial<Inventory>): Promise<Inventory> {
    const newRecord = this.inventoryRepository.create(data);
    return this.inventoryRepository.save(newRecord);
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find({ order: { recordedAt: 'DESC' } });
  }
}
