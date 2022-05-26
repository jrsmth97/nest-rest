import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { 
  ApiBadRequestResponse, 
  ApiCreatedResponse, 
  ApiInternalServerErrorResponse, 
  ApiOkResponse, 
  ApiOperation, 
  ApiTags, 
  ApiUnauthorizedResponse, 
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleDoc } from './docs/article.doc';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';

@Controller('article')
@ApiTags('Article')
@ApiUnauthorizedResponse(ArticleDoc.unauthorizedResponse)
@ApiBadRequestResponse(ArticleDoc.badRequestResponse)
@ApiInternalServerErrorResponse(ArticleDoc.internalServerErrorResponse)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  @ApiOperation(ArticleDoc.create.operation)
  @ApiCreatedResponse(ArticleDoc.create.response)
  public async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.insert(createArticleDto);
  }

  @Get()
  @ApiOperation(ArticleDoc.findAll.operation)
  @ApiOkResponse(ArticleDoc.findAll.response)
  public async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  @ApiOperation(ArticleDoc.findOne.operation)
  @ApiOkResponse(ArticleDoc.findOne.response)
  public async findOne(@Param('id') id: number) {
    return await this.articleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation(ArticleDoc.update.operation)
  @ApiOkResponse(ArticleDoc.update.response)
  public async update(
    @Param('id') id: number, 
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation(ArticleDoc.remove.operation)
  @ApiOkResponse(ArticleDoc.remove.response)
  public async remove(@Param('id') id: number) {
    return await this.articleService.delete(id);
  }
}
