import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly author: Repository<AuthorEntity>,
  ) {}

  async findAll(): Promise<any> {
    return await this.author.find({ relations: ['articles'] });
  }

  async findOne(id: number): Promise<any> {
    return await this.author.findOne({ id }, { relations: ['articles'] });
  }

  async insert(createAuthorDto: CreateAuthorDto): Promise<any> {
    return await this.author.save(createAuthorDto);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<any> {
    const author: any = this.findOne(id);
    if (!author) {
      throw new NotFoundException('author not found !');
    }

    await this.author.update(id, updateAuthorDto);
    return updateAuthorDto;
  }

  async delete(id: number): Promise<any> {
    const author = await this.findOne(id);
    if (!author) {
      throw new NotFoundException('author not found !');
    }
    
    await this.author.delete(id);
    return author;
  }
}
