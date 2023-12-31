import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { take } from 'rxjs';
import {
  ContactsFiltererService,
  SortDirection,
  SortTypeField,
} from '../../services/contacts-filterer.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  contactsList: Contact[] = [];
  allContacts: Contact[] = [];
  isLoading = false;
  pageSizeOptions = [5, 10, 20, 50];
  private pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  private filterOptions: ContactsFilteringOptions = {
    search: null,
    sortTypeField: SortTypeField.ModifiedAt,
    sortDirection: SortDirection.Desc,
    onlyFamily: false,
  };

  constructor(
    private contactsService: ContactsService,
    private contactsFiltererService: ContactsFiltererService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.contactsService
      .getAllContacts()
      .pipe(take(1))
      .subscribe({
        next: (contacts) => {
          this.allContacts = contacts;
          this.updateContactsListPage();
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/contacts']);
        },
      });
  }

  onPaginatorChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateContactsListPage();
  }

  onFilterChange(filterOptions: ContactsFilteringOptions) {
    this.filterOptions = filterOptions;
    this.pageIndex = 0;
    this.updateContactsListPage();
  }

  updateContactsListPage() {
    const sortedContacts = this.contactsFiltererService.sortContacts(
      this.allContacts,
      {
        field: this.filterOptions.sortTypeField,
        direction: this.filterOptions.sortDirection,
      }
    );

    this.contactsList = this.contactsFiltererService.getFilteredContacts(
      sortedContacts,
      {
        page: this.pageIndex + 1,
        pageSize: this.pageSize,
        search: this.filterOptions.search,
        onlyFamily: this.filterOptions.onlyFamily,
      }
    );
  }
}
