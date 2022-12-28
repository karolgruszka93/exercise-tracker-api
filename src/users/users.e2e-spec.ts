import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'users/users.entity';
import { UsersModule } from 'users/users.module';

describe('Users', () => {
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
      'INSERT INTO users VALUES ("1", "mockedFirstName", "mockedLastName", "pictureUrl", "mockedProfileId")',
    );
  });

  afterEach(async () => {
    await usersRepository.query('DELETE FROM users');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 status after find user with specific profile id', async () => {
    return request(app.getHttpServer())
      .get('/user/mockedFbProfileId')
      .expect(200);
  });

  it('should return user with specific profile id', async () => {
    return request(app.getHttpServer())
      .get('/user/mockedProfileId')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          id: '1',
          firstName: 'mockedFirstName',
          lastName: 'mockedLastName',
          picture: 'pictureUrl',
          profileId: 'mockedProfileId',
        });
      });
  });
});
