import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompactionService } from './compaction.service';
import { CompactionController } from './compaction.controller';
import { Compaction } from '../entities/compaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compaction])],
  providers: [CompactionService],
  controllers: [CompactionController],
})
export class CompactionModule {}
