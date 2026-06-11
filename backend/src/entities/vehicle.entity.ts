import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Weighing } from './weighing.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 20 })
  plateNumber: string;

  @Column({ length: 50 })
  type: string; // e.g., 'Compactador', 'Volquete'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  maxCapacityKg: number;

  @OneToMany(() => Weighing, weighing => weighing.vehicle)
  weighings: Weighing[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
