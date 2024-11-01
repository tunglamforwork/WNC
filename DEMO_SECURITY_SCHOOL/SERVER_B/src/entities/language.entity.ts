import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true })
  language_id: number;

  @Column({ type: 'char', length: 20 })
  name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_update: Date;

  @OneToMany(() => Film, (film) => film.language)
  films: Film[];

  @OneToMany(() => Film, (film) => film.original_language)
  originalFilms: Film[];
}
