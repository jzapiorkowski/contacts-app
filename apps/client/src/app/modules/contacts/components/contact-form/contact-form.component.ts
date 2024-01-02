import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

interface ContactForm {
  firstname: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phoneNumber: FormControl<number | null>;
  addresses: FormArray<FormGroup<AddressForm>>;
}

interface AddressForm {
  street: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  zip: FormControl<string | null>;
  country: FormControl<string | null>;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  public contactForm: FormGroup<ContactForm> = new FormGroup<ContactForm>({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    addresses: new FormArray(
      [this.addAddressFormGroup()],
      [Validators.required, Validators.minLength(1)]
    ),
  });

  public isEditMode: boolean = false;
  private destroy$: Subject<boolean> = new Subject();

  public constructor(
    private contactsService: ContactsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id: string | undefined = this.route.snapshot.params['id'];

    if (id) {
      this.isEditMode = true;
      this.loadContact(id);
    }
  }

  private addAddressFormGroup(address?: Address): FormGroup<AddressForm> {
    return new FormGroup<AddressForm>({
      street: new FormControl(address?.street || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      city: new FormControl(address?.city || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      state: new FormControl(address?.state || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      zip: new FormControl(address?.zip || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      country: new FormControl(address?.country || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  public get addressesFormArray(): FormArray<FormGroup<AddressForm>> {
    return this.contactForm.controls.addresses;
  }

  public addAddress(): void {
    this.addressesFormArray.push(this.addAddressFormGroup());
  }

  public removeAddress(index: number): void {
    this.addressesFormArray.removeAt(index);
  }

  public onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contactDto: CreateContactDto = {
      firstname: this.contactForm.value.firstname!,
      lastName: this.contactForm.value.lastName!,
      phoneNumber: this.contactForm.value.phoneNumber!,
      addresses: this.contactForm.value.addresses!.map(
        (address: Record<string, string | null>) => ({
          street: address['street']!,
          city: address['city']!,
          state: address['state']!,
          zip: address['zip']!,
          country: address['country']!,
        })
      ),
    };

    if (this.isEditMode) {
      const id: string = this.route.snapshot.params['id'];

      this.contactsService
        .updateContact(id, contactDto)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toastr.success('Contact updated successfully!');
          this.router.navigate(['/contacts', id]);
        });

      return;
    }

    this.contactsService
      .createNewContact(contactDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe((contact: Contact) => {
        this.toastr.success('Contact created successfully!');
        this.router.navigate(['/contacts', contact._id]);
      });
  }

  private loadContact(id: string): void {
    this.contactsService
      .getContactDetails(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (contact: Contact) => {
          this.contactForm.patchValue({
            firstname: contact.firstname,
            lastName: contact.lastName,
            phoneNumber: contact.phoneNumber,
          });

          this.addressesFormArray.clear();

          contact.addresses.forEach((address: Address) => {
            this.addressesFormArray.push(this.addAddressFormGroup(address));
          });
        },
        error: () => {
          this.router.navigate(['/contacts']);
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
