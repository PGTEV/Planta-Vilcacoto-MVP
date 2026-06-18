import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { Storage } from '../entities/storage.entity';
import { Weighing } from '../entities/weighing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Storage, Weighing])],
  providers: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
