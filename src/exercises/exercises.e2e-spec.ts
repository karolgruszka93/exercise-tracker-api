import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercises } from 'exercises/exercises.entity';
import { ExercisesModule } from 'exercises/exercises.module';

describe('Exercises', () => {
  let app: INestApplication;
  let exercisesRepository: Repository<Exercises>;

  const testingDatabaseConnection = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Exercises],
    synchronize: true,
    logging: false,
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExercisesModule, testingDatabaseConnection],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    exercisesRepository = moduleFixture.get('ExercisesRepository');
  });

  beforeEach(async () => {
    await exercisesRepository.query(
      'INSERT INTO exercises VALUES ("1", "mockedName1"), ("2", "mockedName2")',
    );
  });

  afterEach(async () => {
    await exercisesRepository.query('DELETE FROM exercises');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 201 status after creating exercise', () => {
    return request(app.getHttpServer())
      .post('/exercises')
      .send({ name: 'mockedName' })
      .expect(201);
  });

  it('should return created exercise', () => {
    return request(app.getHttpServer())
      .post('/exercises')
      .send({ name: 'mockedName' })
      .expect((response) => {
        expect(response.body).toHaveProperty('name', 'mockedName');
      });
  });

  it('should return exercise with specific id', async () => {
    return request(app.getHttpServer())
      .get('/exercises/1')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          id: '1',
          name: 'mockedName1',
        });
      });
  });

  it('should return 200 status after find exercise with specific id', async () => {
    return request(app.getHttpServer()).get('/exercises/1').expect(200);
  });

  it('should return null if exercise not exist', async () => {
    return request(app.getHttpServer())
      .get('/exercises/0')
      .expect((response) => {
        expect(response.body).toStrictEqual({});
      });
  });
});
