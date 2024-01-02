import { ConfirmationModalComponent } from './../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  public contactDetails: Contact | null = null;
  public isLoading: boolean = false;
  private destroy$: Subject<boolean> = new Subject();

  public constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.isLoading = true;

    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: Params) => {
          const id: string = params['id'];
          return this.contactsService.getContactDetails(id);
        })
      )
      .subscribe({
        next: (contact: Contact) => {
          this.contactDetails = contact;
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/contacts']);
        },
      });
  }

  public deleteContact(): void {
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
          filter((v: boolean) => v),
          switchMap(() => this.contactsService.deleteContact(_id))
        )
        .subscribe(() => {
          this.toastr.success('Contact deleted successfully!');
          this.router.navigate(['/contacts']);
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
