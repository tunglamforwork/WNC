import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Actor } from './actor.entity';
import { Film } from './film.entity';

@Entity()
export class FilmActor {
  @PrimaryColumn({ type: 'smallint', unsigned: true })
  actor_id: number;

  @PrimaryColumn({ type: 'smallint', unsigned: true })
  film_id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_update: Date;

  @ManyToOne(() => Actor, (actor) => actor.filmActors)
  actor: Actor;

  @ManyToOne(() => Film, (film) => film.filmActors)
  film: Film;
}
