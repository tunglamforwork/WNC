import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Rating {
  G = 'G',
  PG = 'PG',
  PG_13 = 'PG-13',
  R = 'R',
  NC_17 = 'NC-17',
}

export enum Features {
  TRAILERS = 'Trailers',
  COMMENTARIES = 'Commentaries',
  BEHIND_THE_SCENES = 'Behind the Scenes',
  DELETED_SCENES = 'Deleted Scenes',
}

@Entity()
export class Film {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  film_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'year' })
  release_year: string;

  @Column({ type: 'tinyint', unsigned: true })
  language_id: string;

  @Column({ type: 'tinyint', unsigned: true })
  original_language_id: string;

  @Column({ type: 'tinyint', unsigned: true, default: 3 })
  rental_duration: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 4.99 })
  rental_rate: number;

  @Column({ type: 'smallint', unsigned: true })
  length: number;

  @Column({ type: 'smallint', precision: 5, scale: 2, default: 19.99 })
  replacement_cost: number;

  @Column({
    type: 'enum',
    enum: Rating,
    precision: 5,
    scale: 2,
    default: Rating.G,
  })
  rating: Rating;

  @Column({ type: 'set', enum: Features })
  special_features: Features[];

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;
}