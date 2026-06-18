import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('compaction')
export class Compaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  batchId: string; // ID del lote compactado

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  originalWeightKg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  compactedVolumeM3: number; // Volumen después de la compactación

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
