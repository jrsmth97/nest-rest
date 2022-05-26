import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepository } from 'typeorm';
import { AuthorEntity } from '../src/author/entities/author.entity';
import { ArticleEntity } from '../src/article/entities/article.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const url: string = process.env.URL;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/author (POST)', () => {
    const rand = Math.floor(Math.random() * 1000);
    const mockAuthor = {
      name: 'author ' + rand,
      email: 'author' + rand + '@mail.com',
    }

    return request(url)
      .post('/api/author')
      .send(mockAuthor)
      .expect(201)
      .expect(Object);
  });

  it('/api/author (GET)', () => {
    return request(url)
      .get('/api/author')
      .expect(200)
      .expect(Array);
  });

  it('/api/author/:id (GET BY ID)', () => {
    return request(url)
      .get('/api/author/1')
      .expect(200)
      .expect(Object);
  });

  it('/api/author/:id (UPDATE BY ID)', () => {
    const rand = Math.floor(Math.random() * 1000);
    const mockAuthor = {
      name: 'author ' + rand,
      email: 'author' + rand + '@mail.com',
    }

    return request(url)
      .patch('/api/author/1')
      .send(mockAuthor)
      .expect(200)
      .expect(Object);
  });

  it('/api/author/:id (DELETE BY ID)', async () => {
    const authors = await getRepository(AuthorEntity).find()
    const lastId  = authors[authors.length - 1].id
    return request(url)
      .delete('/api/author/' + lastId)
      .expect(200)
      .expect(Object);
  });

  it('/api/article (POST)', () => {
    const rand = Math.floor(Math.random() * 1000);
    const mockArticle = {
      author_id: 1,
      title: 'title ' + rand,
      content: 'content ' + rand,
    }

    return request(url)
      .post('/api/article')
      .send(mockArticle)
      .expect(201)
      .expect(Object);
  });

  it('/api/article (GET)', () => {
    return request(url)
      .get('/api/article')
      .expect(200)
      .expect(Array);
  });

  it('/api/article/:id (GET BY ID)', () => {
    return request(url)
      .get('/api/article/1')
      .expect(200)
      .expect(Object);
  });

  it('/api/article/:id (UPDATE BY ID)', () => {
    const rand = Math.floor(Math.random() * 1000);
    const mockArticle = {
      author_id: 1,
      title: 'title ' + rand,
      content: 'content ' + rand,
    }

    return request(url)
      .patch('/api/article/1')
      .send(mockArticle)
      .expect(200)
      .expect(Object);
  });

  it('/api/article/:id (DELETE BY ID)', async () => {
    const articles = await getRepository(ArticleEntity).find()
    const lastId  = articles[articles.length - 1].id
    return request(url)
      .delete('/api/article/' + lastId)
      .expect(200)
      .expect(Object);
  });

  afterAll(async () => {
    await app.close();
  });
});