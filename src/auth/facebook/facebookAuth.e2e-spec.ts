import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../users/users.entity';
import { FacebookAuthModule } from './facebookAuth.module';
import { UsersModule } from '../../users/users.module';

describe('FacebookAuth controller', () => {
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
      imports: [FacebookAuthModule, UsersModule, testingDatabaseConnection],
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

  it('should return 200 status after find user with specific facebook token', async () => {
    return request(app.getHttpServer())
      .post('/facebook-auth')
      .send({
        facebookToken: 'mockedFbToken',
      })
      .expect(200);
  });

  it('should find and return user with specific facebook token', async () => {
    return request(app.getHttpServer())
      .post('/facebook-auth')
      .send({
        facebookToken: 'mockedFbToken',
      })
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
