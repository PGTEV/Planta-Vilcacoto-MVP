import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('environmental_logs')
export class EnvironmentalLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  phLevel: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  dboValue: number; // Demanda Bioquímica de Oxígeno

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  dqoValue: number; // Demanda Química de Oxígeno

  @Column({ default: false })
  alertTriggered: boolean; // Si superó el Límite Máximo Permisible (LMP)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
