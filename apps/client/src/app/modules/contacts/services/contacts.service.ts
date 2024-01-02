import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ContactsService {
  public constructor(private http: HttpClient) {}

  public getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/contacts');
  }

  public getContactDetails(id: string): Observable<Contact> {
    return this.http.get<Contact>(`http://localhost:3000/contacts/${id}`);
  }

  public createNewContact(contact: CreateContactDto): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:3000/contacts', contact);
  }

  public updateContact(
    id: string,
    contact: Partial<CreateContactDto>
  ): Observable<Contact> {
    return this.http.put<Contact>(
      `http://localhost:3000/contacts/${id}`,
      contact
    );
  }

  public deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/contacts/${id}`);
  }
}
