import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseGroups } from './exerciseGroups.entity';
import { ExerciseGroupsModule } from './exerciseGroups.module';

describe('ExerciseGroups', () => {
  let app: INestApplication;
  let exerciseGroupsRepository: Repository<ExerciseGroups>;

  const testingDatabaseConnection = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [ExerciseGroups],
    synchronize: true,
    logging: false,
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExerciseGroupsModule, testingDatabaseConnection],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    exerciseGroupsRepository = moduleFixture.get('ExerciseGroupsRepository');
  });

  beforeEach(async () => {
    await exerciseGroupsRepository.query(
      'INSERT INTO exercise_groups VALUES ("1", "mockedDescription1"), ("2", "mockedDescription2")',
    );
  });

  afterEach(async () => {
    await exerciseGroupsRepository.query('DELETE FROM exercise_groups');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 201 status after creating exercise group', () => {
    return request(app.getHttpServer())
      .post('/exercise-groups')
      .send({ description: 'mockedDescription' })
      .expect(201);
  });

  it('should return created exercise group', () => {
    return request(app.getHttpServer())
      .post('/exercise-groups')
      .send({ description: 'mockedDescription' })
      .expect((response) => {
        expect(response.body).toHaveProperty(
          'description',
          'mockedDescription',
        );
      });
  });

  it('should return 400 status after trying to save duplicated exercise group', async () => {
    return request(app.getHttpServer())
      .post('/exercise-groups')
      .send({ description: 'mockedDescription1' })
      .expect(400);
  });

  it('should return exercise group with specific id', async () => {
    return request(app.getHttpServer())
      .get('/exercise-groups/1')
      .expect((response) => {
        expect(response.body).toStrictEqual({
          id: '1',
          description: 'mockedDescription1',
        });
      });
  });

  it('should return 200 status after find exercise group with specific id', async () => {
    return request(app.getHttpServer()).get('/exercise-groups/1').expect(200);
  });

  it('should return null if exercise group not exist', async () => {
    return request(app.getHttpServer())
      .get('/exercise-groups/0')
      .expect((response) => {
        expect(response.body).toStrictEqual({});
      });
  });

  it('should return 200 status after find all exercise groups', () => {
    return request(app.getHttpServer()).get('/exercise-groups/').expect(200);
  });

  it('should return array of exercise groups', async () => {
    return request(app.getHttpServer())
      .get('/exercise-groups/')
      .expect((response) => {
        expect(response.body).toStrictEqual([
          { id: '1', description: 'mockedDescription1' },
          { id: '2', description: 'mockedDescription2' },
        ]);
      });
  });
});
