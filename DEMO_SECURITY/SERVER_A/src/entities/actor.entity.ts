import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  actor_id: number;

  @Column({ type: 'varchar', length: 45 })
  first_name: string;

  @Column({ type: 'varchar', length: 45 })
  last_name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_update: Date;
}
