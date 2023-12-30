import { Route } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const contactsRoutes: Route[] = [
  { path: '', component: ContactsListComponent, pathMatch: 'full' },
  { path: 'form', component: ContactFormComponent },
  { path: 'form/:id', component: ContactFormComponent },
  { path: ':id', component: ContactDetailsComponent },
];
