import { Route } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

export const contactsRoutes: Route[] = [
  { path: '', component: ContactsListComponent, pathMatch: 'full' },
  { path: ':id', component: ContactDetailsComponent },
];
