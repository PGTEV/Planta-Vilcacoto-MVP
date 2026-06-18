import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  batchId: string; // e.g., 'LOTE-001'

  @Column({ length: 50, default: 'Compostaje' })
  treatmentType: string; // Compostaje o Biodigestión (Biogás)

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  producedVolume: number; // Cantidad de Compost o Biogás producido

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  temperatureCelsius: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
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
