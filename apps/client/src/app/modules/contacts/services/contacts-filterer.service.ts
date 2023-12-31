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
  LastName = 'lastName',
  PhoneNumber = 'phoneNumber',
  ModifiedAt = 'modifiedAt',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

@Injectable()
export class ContactsFiltererService {
  getFilteredContacts(
    contacts: Contact[],
    { page, pageSize, search, onlyFamily }: ContactFilter
  ): Contact[] {
    if (search) {
      contacts = contacts.filter((contact) =>
        contact.lastName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (onlyFamily) {
      contacts = contacts.filter((contact) => contact.isFamily);
    }

    return contacts.slice((page - 1) * pageSize, page * pageSize);
  }

  sortContacts(contacts: Contact[], { field, direction }: SortType) {
    return contacts.sort((a, b) => {
      const valueA =
        typeof a[field] === 'string'
          ? (a[field] as string).toLowerCase()
          : a[field];
      const valueB =
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
