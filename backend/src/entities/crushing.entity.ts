import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('crushing')
export class Crushing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  batchId: string; // Lote a triturar

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  crushedWeightKg: number; // Peso del material triturado

  @Column({ length: 100 })
  materialType: string; // Tipo de material (e.g., Plástico PET, Cartón)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
