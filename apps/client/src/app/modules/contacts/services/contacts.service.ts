import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ContactsService {
  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/contacts');
  }

  getContactDetails(id: string): Observable<Contact> {
    return this.http.get<Contact>(`http://localhost:3000/contacts/${id}`);
  }

  createNewContact(contact: CreateContactDto): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:3000/contacts', contact);
  }

  updateContact(
    id: string,
    contact: Partial<CreateContactDto>
  ): Observable<Contact> {
    return this.http.put<Contact>(
      `http://localhost:3000/contacts/${id}`,
      contact
    );
  }
}
