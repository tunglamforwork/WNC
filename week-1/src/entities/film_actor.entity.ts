import { Column, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class FilmActor {
  @Column()
  actor_id: string;

  @Column()
  film_id: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;
}
