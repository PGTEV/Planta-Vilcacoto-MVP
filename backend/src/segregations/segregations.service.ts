import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segregation } from '../entities/segregation.entity';

@Injectable()
export class SegregationsService {
  constructor(
    @InjectRepository(Segregation)
    private segregationsRepository: Repository<Segregation>,
  ) {}

  async create(segregationData: Partial<Segregation>): Promise<Segregation> {
    const newSegregation = this.segregationsRepository.create(segregationData);
    return this.segregationsRepository.save(newSegregation);
  }

  async findAll(): Promise<Segregation[]> {
    return this.segregationsRepository.find();
  }

  async findOne(id: string): Promise<Segregation> {
    const segregation = await this.segregationsRepository.findOne({ where: { id } });
    if (!segregation) {
      throw new NotFoundException(`Segregation #${id} not found`);
    }
    return segregation;
  }
}
