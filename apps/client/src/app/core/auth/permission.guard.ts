import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ROLE } from '@contacts-app/libs';

@Injectable()
export class PermissionGuard implements CanActivate {
  public constructor(private authService: AuthService) {}

  public canActivate(next: ActivatedRouteSnapshot): boolean {
    const requiredPermissions: ROLE[] = next.data['permissions'];

    if (!this.authService.hasPermission(requiredPermissions)) {
      return false;
    }

    return true;
  }
}
