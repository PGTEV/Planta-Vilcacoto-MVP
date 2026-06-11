import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('weighings')
export class Weighing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle, vehicle => vehicle.weighings)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: string;

  @Column({ length: 100 })
  origin: string; // e.g., 'Distrito Centro', 'Sector Norte'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  grossWeightKg: number; // Peso Bruto

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tareWeightKg: number; // Tara

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  netWeightKg: number; // Peso Neto (Calculado: Bruto - Tara)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  entryTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  exitTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
