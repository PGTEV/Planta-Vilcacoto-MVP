import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() vehicleData: Partial<Vehicle>) {
    return this.vehiclesService.create(vehicleData);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() vehicleData: Partial<Vehicle>) {
    return this.vehiclesService.update(id, vehicleData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
