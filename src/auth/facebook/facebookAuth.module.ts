import { Module } from '@nestjs/common';
import { FacebookAuthService } from 'auth/facebook/facebookAuth.service';
import { FacebookAuthController } from 'auth/facebook/facebookAuth.controller';
import { UsersModule } from 'users/users.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, HttpModule],
  providers: [FacebookAuthService],
  controllers: [FacebookAuthController],
})
export class FacebookAuthModule {}
