import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../author/entities/author.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly article: Repository<ArticleEntity>,
    @InjectRepository(AuthorEntity)
    private readonly author: Repository<AuthorEntity>,
  ) {}

  async findAll(): Promise<any> {
    return await this.article.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.article.findOne({ id });
  }

  async insert(createArticleDto: CreateArticleDto): Promise<any> {
    const author = await this.author.findOne({ id: createArticleDto.author_id });
    if (!author) {
      throw new NotFoundException('author not found !');
    }

    createArticleDto.author = author;
    return await this.article.save(createArticleDto);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<any> {
    const article: any = this.article.findOne({ id });
    if (!article) {
      throw new NotFoundException('article not found !');
    }

    const author = await this.author.findOne({ id: updateArticleDto.author_id });
    if (!author) {
      throw new NotFoundException('author not found !');
    }

    updateArticleDto.author = author;
    delete updateArticleDto.author_id;
    await this.article.update(id, updateArticleDto);
    return updateArticleDto;
  }

  async delete(id: number): Promise<any> {
    const article = await this.article.findOne(id);
    if (!article) {
      throw new NotFoundException('article not found !');
    }
    
    await this.article.delete(id);
    return article;
  }
}
