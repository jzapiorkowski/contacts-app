import { Route } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

export const contactsRoutes: Route[] = [
  { path: '', component: ContactsListComponent, pathMatch: 'full' },
];
