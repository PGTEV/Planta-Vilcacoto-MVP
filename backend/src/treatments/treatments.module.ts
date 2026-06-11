import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentsService } from './treatments.service';
import { TreatmentsController } from './treatments.controller';
import { Treatment } from '../entities/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment])],
  providers: [TreatmentsService],
  controllers: [TreatmentsController],
})
export class TreatmentsModule {}
