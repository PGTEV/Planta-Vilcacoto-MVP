import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treatment } from '../entities/treatment.entity';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentsRepository: Repository<Treatment>,
  ) {}

  async create(treatmentData: Partial<Treatment>): Promise<Treatment> {
    const newTreatment = this.treatmentsRepository.create(treatmentData);
    return this.treatmentsRepository.save(newTreatment);
  }

  async findAll(): Promise<Treatment[]> {
    return this.treatmentsRepository.find();
  }

  async findOne(id: string): Promise<Treatment> {
    const treatment = await this.treatmentsRepository.findOne({ where: { id } });
    if (!treatment) {
      throw new NotFoundException(`Treatment #${id} not found`);
    }
    return treatment;
  }
}
