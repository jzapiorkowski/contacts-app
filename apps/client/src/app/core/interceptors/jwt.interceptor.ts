import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../auth/jwt/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public constructor(private jwtService: JwtService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.jwtService.token}`,
      },
    });
    return next.handle(request);
  }
}
