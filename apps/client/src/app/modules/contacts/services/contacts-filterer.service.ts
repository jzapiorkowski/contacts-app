import { Injectable } from '@angular/core';

interface ContactFilter {
  page: number;
  pageSize: number;
  search: string | null;
  onlyFamily: boolean;
}

interface SortType {
  field: SortTypeField;
  direction: SortDirection;
}

export enum SortTypeField {
  LAST_NAME = 'lastName',
  PHONE_NUMBER = 'phoneNumber',
  MODIFIED_AT = 'modifiedAt',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

@Injectable()
export class ContactsFiltererService {
  public getFilteredContacts(
    contacts: Contact[],
    { page, pageSize, search, onlyFamily }: ContactFilter
  ): Contact[] {
    if (search) {
      contacts = contacts.filter((contact: Contact) =>
        contact.lastName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (onlyFamily) {
      contacts = contacts.filter((contact: Contact) => contact.isFamily);
    }

    return contacts.slice((page - 1) * pageSize, page * pageSize);
  }

  public sortContacts(
    contacts: Contact[],
    { field, direction }: SortType
  ): Contact[] {
    return contacts.sort((a: Contact, b: Contact) => {
      const valueA: string | number =
        typeof a[field] === 'string'
          ? (a[field] as string).toLowerCase()
          : a[field];
      const valueB: string | number =
        typeof b[field] === 'string'
          ? (b[field] as string).toLowerCase()
          : b[field];

      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }
}
