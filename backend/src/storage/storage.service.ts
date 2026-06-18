import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from '../entities/storage.entity';
import { Weighing } from '../entities/weighing.entity';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    @InjectRepository(Weighing)
    private weighingRepository: Repository<Weighing>,
  ) {}

  async create(data: Partial<Storage>): Promise<Storage> {
    const newRecord = this.storageRepository.create(data);
    return this.storageRepository.save(newRecord);
  }

  async findAll(): Promise<any[]> {
    const storages = await this.storageRepository.find({ order: { recordedAt: 'DESC' } });
    
    // Manual join to include weighing info since there's no direct relation defined via TypeORM yet
    const enrichedStorages = await Promise.all(
      storages.map(async (s) => {
        const weighing = await this.weighingRepository.findOne({ where: { id: s.weighingId } });
        return { ...s, weighing };
      })
    );
    return enrichedStorages;
  }
}
