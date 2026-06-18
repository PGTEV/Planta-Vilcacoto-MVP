import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  materialType: string; // Ej: 'Plástico PET', 'Vidrio', 'Abono Orgánico'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityKg: number; // Cantidad almacenada lista para venta/uso

  @Column({ length: 100, nullable: true })
  location: string; // Dónde está almacenado

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
