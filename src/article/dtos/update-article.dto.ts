import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AuthorEntity } from '../../author/entities/author.entity';

export class UpdateArticleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  author_id: number;

  @ApiHideProperty()
  author: AuthorEntity;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
}
