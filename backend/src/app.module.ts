import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { WeighingsModule } from './weighings/weighings.module';
import { SegregationsModule } from './segregations/segregations.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { EnvironmentalLogsModule } from './environmental-logs/environmental-logs.module';
import { CrushingModule } from './crushing/crushing.module';
import { CompactionModule } from './compaction/compaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Auto-create tables (only for development)
      }),
      inject: [ConfigService],
    }),
    VehiclesModule,
    WeighingsModule,
    SegregationsModule,
    TreatmentsModule,
    EnvironmentalLogsModule,
    CrushingModule,
    CompactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
