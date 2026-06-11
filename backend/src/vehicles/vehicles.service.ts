import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesRepository.find();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not found`);
    }
    return vehicle;
  }

  async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const newVehicle = this.vehiclesRepository.create(vehicleData);
    return this.vehiclesRepository.save(newVehicle);
  }

  async update(id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    await this.vehiclesRepository.update(id, vehicleData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.vehiclesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle #${id} not found`);
    }
  }
}
