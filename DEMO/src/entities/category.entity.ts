import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilmCategory } from './film_category.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true })
  category_id: number;

  @Column({ type: 'varchar', length: 25 })
  name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_update: Date;

  @OneToMany(() => FilmCategory, (filmCategory) => filmCategory.category)
  filmCategories: FilmCategory[];
}
