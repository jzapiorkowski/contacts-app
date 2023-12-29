import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  firstname: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  phoneNumber: number;

  @IsOptional()
  addresses: UpdateContactAddressDto[];
}

class UpdateContactAddressDto {
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
