import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  batchId: string; // e.g., 'LOTE-001'

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  temperatureCelsius: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  humidityPercentage: number;

  @Column({ default: false })
  isTurned: boolean; // Si se realizó el volteo de la pila de compost

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
