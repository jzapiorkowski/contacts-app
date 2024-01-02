import {
  CreateUserRequestDto,
  ROLE,
  UserResponseDto,
} from '@contacts-app/libs';
import { Injectable } from '@angular/core';
import { JwtService } from '../../core/auth/jwt/jwt.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public constructor(
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  public get getUserId(): string {
    return (this.jwtService.decodeToken() as TokenPayload).sub;
  }

  public get getUserUsername(): string {
    return (this.jwtService.decodeToken() as TokenPayload).username;
  }

  public get getPermissions(): ROLE[] {
    return (this.jwtService.decodeToken() as TokenPayload).roles;
  }

  public get allUsers(): Observable<UserResponseDto[]> {
    return this.http
      .get<UserResponseDto[]>('http://localhost:3000/user')
      .pipe();
  }

  public register({
    username,
    password,
    roles = [],
  }: CreateUserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(
      'http://localhost:3000/user/signup',
      {
        username,
        password,
        roles,
      }
    );
  }
}
