import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseGroups } from './exerciseGroups/exerciseGroups.entity';
import { ExerciseGroupsModule } from './exerciseGroups/exerciseGroups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [ExerciseGroups],
      synchronize: true,
    }),
    ExerciseGroupsModule,
  ],
})
export class AppModule {}
