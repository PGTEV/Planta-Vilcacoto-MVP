import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrushingService } from './crushing.service';
import { CrushingController } from './crushing.controller';
import { Crushing } from '../entities/crushing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crushing])],
  providers: [CrushingService],
  controllers: [CrushingController],
})
export class CrushingModule {}
