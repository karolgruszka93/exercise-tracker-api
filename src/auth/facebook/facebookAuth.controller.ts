import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { FacebookAuthService } from 'auth/facebook/facebookAuth.service';
import { User } from 'users/interfaces/users.interface';
import { FacebookAuthDto } from 'auth/facebook/dto/facebookAuth.dto';

@Controller('facebook-auth')
export class FacebookAuthController {
  constructor(private facebookAuthService: FacebookAuthService) {}

  @Post()
  @HttpCode(200)
  async authUserByFacebook(
    @Body() facebookAuthDto: FacebookAuthDto,
  ): Promise<User> {
    const facebookToken = facebookAuthDto.facebookToken;
    return this.facebookAuthService.checkUserByFacebook(facebookToken);
  }
}
