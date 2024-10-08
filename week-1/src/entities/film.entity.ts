import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  film_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  release_year: string;

  @Column()
  language_id: string;

  @Column()
  original_language_id: string;

  @Column()
  rental_duration: number;

  @Column()
  rental_rate: number;

  @Column()
  length: number;

  @Column()
  replcaement_cost: number;

  @Column()
  rating: string;

  @Column()
  speacial_features: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;
}
