import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, of, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contactDetails: Contact | null = null;
  isLoading = false;
  destroy$ = new Subject();

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const id = params['id'];
          return this.contactsService.getContactDetails(id);
        }),
        catchError(() => {
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe((contact) => {
        this.contactDetails = contact;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
