import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilmActor } from './film_actor.entity';

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

  @OneToMany(() => FilmActor, (filmActor) => filmActor.actor)
  filmActors: FilmActor[];
}
