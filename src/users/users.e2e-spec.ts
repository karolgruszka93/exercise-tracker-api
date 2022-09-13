import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersModule } from './users.module';

describe('Users controller', () => {
  let app: INestApplication;
  let usersRepository: Repository<Users>;

  const testingDatabaseConnection = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Users],
    synchronize: true,
    logging: false,
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, testingDatabaseConnection],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersRepository = moduleFixture.get('UsersRepository');
  });

  beforeEach(async () => {
    await usersRepository.query(
      'INSERT INTO users VALUES ("1", "mockedFirstName", "mockedLastName", "pictureUrl", "mockedFbToken", "mockedGoogleToken")',
    );
  });

  afterEach(async () => {
    await usersRepository.query('DELETE FROM users');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 status after find user with specific id', async () => {
    return request(app.getHttpServer()).get('/user/1').expect(200);
  });

  it('should return exercise group with specific id', async () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          id: '1',
          firstName: 'mockedFirstName',
          lastName: 'mockedLastName',
          picture: 'pictureUrl',
          facebookToken: 'mockedFbToken',
          googleToken: 'mockedGoogleToken',
        });
      });
  });
});
