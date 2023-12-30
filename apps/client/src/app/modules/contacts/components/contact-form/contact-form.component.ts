import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
export class ContactFormComponent {
  contactForm = new FormGroup<ContactForm>({
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
      [this.createAddressFormGroup()],
      [Validators.required, Validators.minLength(1)]
    ),
  });

  constructor(
    private contactsService: ContactsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  createAddressFormGroup(): FormGroup<AddressForm> {
    return new FormGroup<AddressForm>({
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      zip: new FormControl('', [Validators.required, Validators.minLength(3)]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get addressesFormArray(): FormArray<FormGroup<AddressForm>> {
    return this.contactForm.controls.addresses;
  }

  addAddress() {
    this.addressesFormArray.push(this.createAddressFormGroup());
  }

  removeAddress(index: number) {
    this.addressesFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    console.log(this.contactForm.value);

    const createContactDto: CreateContactDto = {
      firstname: this.contactForm.value.firstname!,
      lastName: this.contactForm.value.lastName!,
      phoneNumber: this.contactForm.value.phoneNumber!,
      addresses: this.contactForm.value.addresses!.map((address) => ({
        street: address.street!,
        city: address.city!,
        state: address.state!,
        zip: address.zip!,
        country: address.country!,
      })),
    };

    this.contactsService
      .createNewContact(createContactDto)
      .subscribe((contact) => {
        this.toastr.success('Contact created successfully!');
        this.router.navigate(['/contacts', contact._id]);
      });
  }
}
