import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const username = 'mahi7781';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET user from Instagram API', async () => {
    const response = await request(app.getHttpServer())
      .get(`/instagram/user/${username}`)
      .expect(200);
    expect(JSON.parse(response.text).message === 'success');
  });

  it('GET followers for user from Instagram API', async () => {
    const userResponse = await request(app.getHttpServer())
      .get(`/local/users/${username}`)
      .expect(200);
    const userId = JSON.parse(userResponse.text).id;

    const followsResponse = await request(app.getHttpServer())
      .get(`/instagram/follows/${userId}`)
      .expect(200);
    expect(JSON.parse(followsResponse.text).message === 'success');
  });

  it('GET followers for user from local database', async () => {
    const userResponse = await request(app.getHttpServer())
      .get(`/local/users/${username}`)
      .expect(200);
    const userId = JSON.parse(userResponse.text).id;

    await request(app.getHttpServer())
      .get(`/local/follows/${userId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
