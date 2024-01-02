import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { ACCESS_TOKEN } from '@contacts-app/libs';
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private constructor(private localStorageService: LocalStorageService) {}

  public get token(): string {
    return this.localStorageService.getItem(ACCESS_TOKEN)! as string;
  }

  public decodeToken(): unknown {
    try {
      return jwt_decode(this.token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
}
