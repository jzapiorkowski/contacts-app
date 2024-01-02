import { Route } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      // eslint-disable-next-line @typescript-eslint/typedef
      import('./auth-form/auth-form.module').then((m) => m.AuthFormModule),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./modules/contacts/contacts.module').then(
        // eslint-disable-next-line @typescript-eslint/typedef
        (m) => m.ContactsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];
