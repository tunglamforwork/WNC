import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from './category.entity';
import { Film } from './film.entity';

@Entity()
export class FilmCategory {
  @PrimaryColumn({ type: 'smallint', unsigned: true })
  film_id: number;

  @PrimaryColumn({ type: 'tinyint', unsigned: true })
  category_id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_update: Date;

  @ManyToOne(() => Film, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @ManyToOne(() => Category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
