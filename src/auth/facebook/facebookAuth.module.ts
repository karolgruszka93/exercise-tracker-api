import { Module } from '@nestjs/common';
import { FacebookAuthService } from './facebookAuth.service';
import { FacebookAuthController } from './facebookAuth.controller';
import { UsersModule } from '../../users/users.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, HttpModule],
  providers: [FacebookAuthService],
  controllers: [FacebookAuthController],
})
export class FacebookAuthModule {}
