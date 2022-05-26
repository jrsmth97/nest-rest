import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AuthorEntity } from '../../author/entities/author.entity';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly author_id: number;

  @ApiHideProperty()
  author: AuthorEntity;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly content: string;
}
