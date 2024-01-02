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
  public contactsList: Contact[] = [];
  public allContacts: Contact[] = [];
  public isLoading: boolean = false;
  public pageSizeOptions: number[] = [5, 10, 20, 50];
  public pageIndex: number = 0;
  private pageSize: number = this.pageSizeOptions[0];
  private filterOptions: ContactsFilteringOptions = {
    search: null,
    sortTypeField: SortTypeField.MODIFIED_AT,
    sortDirection: SortDirection.DESC,
    onlyFamily: false,
  };

  public constructor(
    private contactsService: ContactsService,
    private contactsFiltererService: ContactsFiltererService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.isLoading = true;

    this.contactsService
      .getAllContacts()
      .pipe(take(1))
      .subscribe({
        next: (contacts: Contact[]) => {
          this.allContacts = contacts;
          this.updateContactsListPage();
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/contacts']);
        },
      });
  }

  public onPaginatorChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateContactsListPage();
  }

  public onFilterChange(filterOptions: ContactsFilteringOptions): void {
    this.filterOptions = filterOptions;
    this.pageIndex = 0;
    this.updateContactsListPage();
  }

  public updateContactsListPage(): void {
    const sortedContacts: Contact[] = this.contactsFiltererService.sortContacts(
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
