import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { User } from 'users/interfaces/users.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { facebookAPI } from 'helpers/services';

@Injectable()
export class FacebookAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  async checkUserByFacebook(facebookToken: string): Promise<User> {
    try {
      const fetchedFacebookUser = await lastValueFrom(
        this.httpService.get(facebookAPI + facebookToken),
      );

      const user = await this.usersService.findUserByProfileId(
        fetchedFacebookUser?.data?.id,
      );

      if (user) {
        return user;
      } else {
        return await this.usersService.createUser({
          firstName: fetchedFacebookUser?.data?.first_name,
          lastName: fetchedFacebookUser?.data?.last_name,
          picture: fetchedFacebookUser?.data?.picture?.data?.url,
          profileId: fetchedFacebookUser?.data?.id,
        });
      }
    } catch (error) {
      if (error.name === 'AxiosError') {
        throw new HttpException(
          {
            status: HttpStatus.SERVICE_UNAVAILABLE,
            error: `External service unavailable. ${error.response?.data?.error?.message}`,
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      if (error.name === 'QueryFailedError') {
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
