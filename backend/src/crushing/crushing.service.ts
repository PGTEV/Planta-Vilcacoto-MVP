import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crushing } from '../entities/crushing.entity';

@Injectable()
export class CrushingService {
  constructor(
    @InjectRepository(Crushing)
    private crushingRepository: Repository<Crushing>,
  ) {}

  async create(data: Partial<Crushing>): Promise<Crushing> {
    const newRecord = this.crushingRepository.create(data);
    return this.crushingRepository.save(newRecord);
  }

  async findAll(): Promise<Crushing[]> {
    return this.crushingRepository.find();
  }

  async findOne(id: string): Promise<Crushing> {
    const record = await this.crushingRepository.findOne({ where: { id } });
    if (!record) throw new NotFoundException(`Crushing record #${id} not found`);
    return record;
  }
}
