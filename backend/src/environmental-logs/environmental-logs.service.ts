import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalLog } from '../entities/environmental-log.entity';

@Injectable()
export class EnvironmentalLogsService {
  constructor(
    @InjectRepository(EnvironmentalLog)
    private logsRepository: Repository<EnvironmentalLog>,
  ) {}

  async create(logData: Partial<EnvironmentalLog>): Promise<EnvironmentalLog> {
    // Basic logic to determine if an alert should be triggered
    // e.g. LMP for pH could be > 9 or < 5.5
    if (logData.phLevel && (logData.phLevel < 5.5 || logData.phLevel > 9)) {
      logData.alertTriggered = true;
    }

    const newLog = this.logsRepository.create(logData);
    return this.logsRepository.save(newLog);
  }

  async findAll(): Promise<EnvironmentalLog[]> {
    return this.logsRepository.find();
  }

  async findOne(id: string): Promise<EnvironmentalLog> {
    const log = await this.logsRepository.findOne({ where: { id } });
    if (!log) {
      throw new NotFoundException(`Environmental Log #${id} not found`);
    }
    return log;
  }
}
