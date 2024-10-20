import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['REQUEST', 'RESPONSE'],
  })
  type: 'REQUEST' | 'RESPONSE';

  @Column({ type: 'int', nullable: true })
  status_code?: number;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;

  @Column('json')
  data: any;
}
