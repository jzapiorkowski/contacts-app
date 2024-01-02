import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { GlobalErrorInterceptor } from './global-error.interceptor';
import { EnvironmentProviders, Provider } from '@angular/core';

export const interceptorsProviders: (Provider | EnvironmentProviders)[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalErrorInterceptor,
    multi: true,
  },
];
