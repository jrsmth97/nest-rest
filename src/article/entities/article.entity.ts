import { AuthorEntity } from '../../author/entities/author.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthorEntity, (author) => author.articles)
  @JoinColumn({ name: 'author_id' })
  author: AuthorEntity;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
