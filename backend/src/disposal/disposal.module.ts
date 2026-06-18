import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisposalService } from './disposal.service';
import { DisposalController } from './disposal.controller';
import { Disposal } from '../entities/disposal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disposal])],
  providers: [DisposalService],
  controllers: [DisposalController],
})
export class DisposalModule {}
