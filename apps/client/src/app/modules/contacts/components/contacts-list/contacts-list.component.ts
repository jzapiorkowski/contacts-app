import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  contactsList: Contact[] = [];
  isLoading = false;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.contactsService
      .getAllContacts()
      .pipe(
        take(1),
        catchError(() => {
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe((contacts) => {
        this.contactsList = contacts;
        this.isLoading = false;
      });
  }
}
