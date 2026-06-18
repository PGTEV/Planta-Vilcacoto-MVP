import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('disposals')
export class Disposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  destination: string; // Ej: 'Relleno Sanitario Municipal'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  volumeM3: number; // Volumen de residuos rechazados

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weightKg: number;

  @Column({ length: 50, nullable: true })
  vehiclePlate: string; // Placa del vehículo que transportó al relleno

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
