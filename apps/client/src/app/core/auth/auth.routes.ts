import { Route } from '@angular/router';
import { AuthFormComponent } from './auth-form/auth-form.component';

export const authRoutes: Route[] = [
  { path: 'login', component: AuthFormComponent },
  { path: 'register', component: AuthFormComponent },
];
