import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'users/users.entity';
import { FacebookAuthModule } from 'auth/facebook/facebookAuth.module';
import { UsersModule } from 'users/users.module';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('FacebookAuth', () => {
  let app: INestApplication;
  let usersRepository: Repository<Users>;
  let moduleFixture: TestingModule;

  const testingDatabaseConnection = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Users],
    synchronize: true,
    logging: false,
  });

  const mockedFbResponse = {
    data: {
      id: 'mockedProfileId',
      first_name: 'mockedFirstName',
      last_name: 'mockedLastName',
      picture: {
        data: {
          url: 'mockedPictureUrl',
        },
      },
    },
    status: 200,
    statusText: 'OK',
  };

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [FacebookAuthModule, UsersModule, testingDatabaseConnection],
    })
      .overrideProvider(HttpService)
      .useValue({
        get: jest.fn().mockReturnValue(of(mockedFbResponse)),
      })
      .compile();
    app = moduleFixture.createNestApplication();

    usersRepository = moduleFixture.get('UsersRepository');

    await app.init();
  });

  beforeEach(async () => {
    await usersRepository.query(
      'INSERT INTO users VALUES ("1", "mockedFirstName", "mockedLastName", "mockedPictureUrl", "mockedProfileId")',
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
      .post('/facebook-auth')
      .send({
        facebookToken: 'mockedFbToken',
      })
      .expect(200);
  });

  it('should find and return user with specific profile id', async () => {
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
          picture: 'mockedPictureUrl',
          profileId: 'mockedProfileId',
        });
      });
  });

  it('should create and return user with specific profile id', async () => {
    await usersRepository.query('DELETE FROM users');
    return request(app.getHttpServer())
      .post('/facebook-auth')
      .send({
        facebookToken: 'mockedFbToken',
      })
      .expect((response) => {
        expect(response.body).toMatchObject({
          firstName: 'mockedFirstName',
          lastName: 'mockedLastName',
          picture: 'mockedPictureUrl',
          profileId: 'mockedProfileId',
        });
      });
  });
});
