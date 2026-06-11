import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeighingsService } from './weighings.service';
import { WeighingsController } from './weighings.controller';
import { Weighing } from '../entities/weighing.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weighing]),
    VehiclesModule,
  ],
  providers: [WeighingsService],
  controllers: [WeighingsController],
})
export class WeighingsModule {}
