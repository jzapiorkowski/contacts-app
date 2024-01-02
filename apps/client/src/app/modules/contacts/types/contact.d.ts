interface Contact {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string;
  ownerId: string;
  firstname: string;
  lastName: string;
  phoneNumber: number;
  modifiedAt: string;
  isFamily: boolean;
  addresses: Address[];
}
