import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('segregations')
export class Segregation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  organicWeightKg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  plasticsWeightKg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paperWeightKg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  glassWeightKg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  rejectsWeightKg: number; // Material no aprovechable

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateRecorded: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
