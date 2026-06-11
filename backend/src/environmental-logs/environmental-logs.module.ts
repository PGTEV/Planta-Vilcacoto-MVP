import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentalLogsService } from './environmental-logs.service';
import { EnvironmentalLogsController } from './environmental-logs.controller';
import { EnvironmentalLog } from '../entities/environmental-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnvironmentalLog])],
  providers: [EnvironmentalLogsService],
  controllers: [EnvironmentalLogsController],
})
export class EnvironmentalLogsModule {}
