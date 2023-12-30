import { ConfirmationModalComponent } from './../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, filter, of, switchMap, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

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
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private matDialog: MatDialog
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

  deleteContact() {
    if (this.contactDetails) {
      const { _id } = this.contactDetails;

      this.matDialog
        .open(ConfirmationModalComponent, {
          width: '350px',
          data: {
            title: 'Delete contact',
            body: 'Are you sure you want to delete this contact?',
          },
        })
        .afterClosed()
        .pipe(
          takeUntil(this.destroy$),
          filter((v) => v),
          switchMap(() => this.contactsService.deleteContact(_id))
        )
        .subscribe(() => {
          this.toastr.success('Contact deleted successfully!');
          this.router.navigate(['/contacts']);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
