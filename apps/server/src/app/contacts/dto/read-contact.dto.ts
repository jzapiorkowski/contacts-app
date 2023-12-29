export class ReadContactDto {
  _id: string;

  ownerId: string;

  firstname: string;

  lastName: string;

  phoneNumber: number;

  addresses: ReadContactAddressDto[];
}

class ReadContactAddressDto {
  street: string;

  city: string;

  state: string;

  zip: string;

  country: string;
}
