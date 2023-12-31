interface Contact {
  _id: string;
  ownerId: string;
  firstname: string;
  lastName: string;
  phoneNumber: number;
  modifiedAt: string;
  isFamily: boolean;
  addresses: Address[];
}
