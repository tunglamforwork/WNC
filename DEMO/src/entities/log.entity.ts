import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  method: string;

  @Column()
  endpoint: string;

  @Column()
  statusCode: number;

  @Column()
  duration: number;

  @Column({ nullable: true })
  error: string;

  @Column({ type: 'text', nullable: true })
  request: string;

  @Column({ type: 'text', nullable: true })
  response: string;
}
