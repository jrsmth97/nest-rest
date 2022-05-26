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
import { AuthorService } from './author.service';
import { AuthorDoc } from './docs/author.doc';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';

@Controller('author')
@ApiTags('Author')
@ApiUnauthorizedResponse(AuthorDoc.unauthorizedResponse)
@ApiBadRequestResponse(AuthorDoc.badRequestResponse)
@ApiInternalServerErrorResponse(AuthorDoc.internalServerErrorResponse)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) { }

  @Post()
  @ApiOperation(AuthorDoc.create.operation)
  @ApiCreatedResponse(AuthorDoc.create.response)
  public async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorService.insert(createAuthorDto);
  }

  @Get()
  @ApiOperation(AuthorDoc.findAll.operation)
  @ApiOkResponse(AuthorDoc.findAll.response)
  public async findAll() {
    return await this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation(AuthorDoc.findOne.operation)
  @ApiOkResponse(AuthorDoc.findOne.response)
  public async findOne(@Param('id') id: number) {
    return await this.authorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation(AuthorDoc.update.operation)
  @ApiOkResponse(AuthorDoc.update.response)
  public async update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation(AuthorDoc.remove.operation)
  @ApiOkResponse(AuthorDoc.remove.response)
  public async remove(@Param('id') id: number) {
    return await this.authorService.delete(id);
  }
}
