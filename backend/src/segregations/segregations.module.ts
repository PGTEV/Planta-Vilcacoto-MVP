import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegregationsService } from './segregations.service';
import { SegregationsController } from './segregations.controller';
import { Segregation } from '../entities/segregation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Segregation])],
  providers: [SegregationsService],
  controllers: [SegregationsController],
})
export class SegregationsModule {}
