import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { shareReplay, tap, Observable } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import {
  ACCESS_TOKEN,
  EXPIRES_AT,
  LoginResponseDto,
  ROLE,
  SignInDto,
} from '@contacts-app/libs';

@Injectable()
export class AuthService {
  public constructor(
    private http: HttpClient,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  public login({
    username,
    password,
  }: SignInDto): Observable<LoginResponseDto> {
    return this.http
      .post<LoginResponseDto>('http://localhost:3000/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((res) => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult: LoginResponseDto): void {
    const match: RegExpMatchArray | null =
      authResult.expires_in.match(/^(\d+)h$/);
    const hours: number = parseInt(match![1], 10);
    const expiresIn: number = hours * 3600;

    const expiresAt: moment.Moment = moment().add(expiresIn, 'second');

    this.localStorageService.setItem(ACCESS_TOKEN, authResult.access_token);
    this.localStorageService.setItem(
      EXPIRES_AT,
      JSON.stringify(expiresAt.valueOf())
    );
  }

  public logout(): void {
    this.localStorageService.removeItem(ACCESS_TOKEN);
    this.localStorageService.removeItem(EXPIRES_AT);
  }

  public isLoggedIn(): boolean {
    const expiresAt: moment.Moment = this.getExpiration();

    return moment().isBefore(expiresAt);
  }

  private getExpiration(): moment.Moment {
    const expiration: string = this.localStorageService.getItem(
      EXPIRES_AT
    )! as string;
    const expiresAt: string = JSON.parse(expiration!);

    return moment(expiresAt);
  }

  public hasPermission(requiredPermissions: ROLE[]): boolean {
    return this.userService.getPermissions.some((permission: ROLE) =>
      requiredPermissions.includes(permission)
    );
  }
}
