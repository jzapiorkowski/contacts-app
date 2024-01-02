import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  private constructor(private toastr: ToastrService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(
          error.error?.message || error.message || 'Something went wrong',
          'Error',
          { closeButton: true }
        );

        return throwError(() => error);
      })
    );
  }
}
