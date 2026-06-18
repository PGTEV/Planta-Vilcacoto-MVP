import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compaction } from '../entities/compaction.entity';

@Injectable()
export class CompactionService {
  constructor(
    @InjectRepository(Compaction)
    private compactionRepository: Repository<Compaction>,
  ) {}

  async create(data: Partial<Compaction>): Promise<Compaction> {
    const newRecord = this.compactionRepository.create(data);
    return this.compactionRepository.save(newRecord);
  }

  async findAll(): Promise<Compaction[]> {
    return this.compactionRepository.find();
  }

  async findOne(id: string): Promise<Compaction> {
    const record = await this.compactionRepository.findOne({ where: { id } });
    if (!record) throw new NotFoundException(`Compaction record #${id} not found`);
    return record;
  }
}
