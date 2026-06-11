import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weighing } from '../entities/weighing.entity';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable()
export class WeighingsService {
  constructor(
    @InjectRepository(Weighing)
    private weighingsRepository: Repository<Weighing>,
    private vehiclesService: VehiclesService,
  ) {}

  async create(weighingData: Partial<Weighing>): Promise<Weighing> {
    if (!weighingData.vehicleId) {
      throw new BadRequestException('vehicleId is required');
    }

    // Verify vehicle exists
    await this.vehiclesService.findOne(weighingData.vehicleId);

    // Calculate Net Weight automatically
    if (weighingData.grossWeightKg !== undefined && weighingData.tareWeightKg !== undefined) {
      weighingData.netWeightKg = weighingData.grossWeightKg - weighingData.tareWeightKg;
    }

    const newWeighing = this.weighingsRepository.create(weighingData);
    return this.weighingsRepository.save(newWeighing);
  }

  async findAll(): Promise<Weighing[]> {
    return this.weighingsRepository.find({ relations: { vehicle: true } });
  }

  async findOne(id: string): Promise<Weighing> {
    const weighing = await this.weighingsRepository.findOne({ 
      where: { id },
      relations: { vehicle: true },
    });
    if (!weighing) {
      throw new NotFoundException(`Weighing #${id} not found`);
    }
    return weighing;
  }
}
