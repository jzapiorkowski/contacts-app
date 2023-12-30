import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { RouterModule } from '@angular/router';
import { contactsRoutes } from './contacts.routes';
import { ContactsService } from './services/contacts.service';
import { MaterialModule } from '../../core/material/material.module';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactDetailsComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contactsRoutes),
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [ContactsService],
})
export class ContactsModule {}
