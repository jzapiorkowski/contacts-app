import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { RouterModule } from '@angular/router';
import { contactsRoutes } from './contacts.routes';
import { ContactsService } from './services/contacts.service';
import { MaterialModule } from '../../material/material.module';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

@NgModule({
  declarations: [ContactsListComponent, ContactDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactsRoutes),
    MaterialModule,
  ],
  exports: [RouterModule],
  providers: [ContactsService],
})
export class ContactsModule {}
