import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/interfaces/users.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { facebookAPI } from '../../helpers/services';

@Injectable()
export class FacebookAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  async checkUserByFacebookToken(facebookToken: string): Promise<User> {
    const user = await this.usersService.findUserByFacebookToken(facebookToken);
    if (user) {
      return user;
    } else {
      return this.createUserByFacebookToken(facebookToken);
    }
  }

  async createUserByFacebookToken(facebookToken: string): Promise<User> {
    try {
      const fetchedFacebookUser = await lastValueFrom(
        this.httpService.get(facebookAPI + facebookToken),
      );

      return await this.usersService.createUser({
        firstName: fetchedFacebookUser?.data?.first_name,
        lastName: fetchedFacebookUser?.data?.last_name,
        picture: fetchedFacebookUser?.data?.picture?.data?.url,
        facebookToken,
        googleToken: null,
      });
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        throw new HttpException(
          {
            status: HttpStatus.SERVICE_UNAVAILABLE,
            error: `External service unavailable. ${error.response?.data?.error?.message}`,
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      if (
        error.code === 'ER_BAD_NULL_ERROR' ||
        error.code === 'ER_NO_DEFAULT_FOR_FIELD'
      ) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `Internal server error. ${error?.sqlMessage}`,
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while creating user.',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    }
  }
}
