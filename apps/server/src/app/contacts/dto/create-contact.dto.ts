import { ArrayNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  firstname: string;

  @IsString()
  lastName: string;

  @IsNumber()
  phoneNumber: number;

  @ArrayNotEmpty()
  addresses: CreateContactAddressDto[];
}

class CreateContactAddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip: string;

  @IsString()
  country: string;
}
