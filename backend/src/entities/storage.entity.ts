import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('storages')
export class Storage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  weighingId: string; // ID del pesaje asignado (vinculado al camión)

  @Column({ length: 100 })
  zone: string; // Ej: 'Bahía A', 'Zona 2'

  @Column({ type: 'text', nullable: true })
  notes: string; // Detalles de la inspección visual

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
