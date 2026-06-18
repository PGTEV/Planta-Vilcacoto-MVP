import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disposal } from '../entities/disposal.entity';

@Injectable()
export class DisposalService {
  constructor(
    @InjectRepository(Disposal)
    private disposalRepository: Repository<Disposal>,
  ) {}

  async create(data: Partial<Disposal>): Promise<Disposal> {
    const newRecord = this.disposalRepository.create(data);
    return this.disposalRepository.save(newRecord);
  }

  async findAll(): Promise<Disposal[]> {
    return this.disposalRepository.find({ order: { recordedAt: 'DESC' } });
  }
}
