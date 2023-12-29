import { ReadContactDto } from '../dto/read-contact.dto';
import { Contact } from '../models/contact.schema';

export class ContactMapper {
  static entityToOutputDto(contact: Contact): ReadContactDto {
    const readContactDto = new ReadContactDto();
    readContactDto._id = contact._id;
    readContactDto.firstname = contact.firstname;
    readContactDto.lastName = contact.lastName;
    readContactDto.phoneNumber = contact.phoneNumber;
    readContactDto.addresses = contact.addresses;
    readContactDto.ownerId = contact.ownerId;

    return readContactDto;
  }

  static entitiesToOutputDtos(contacts: Contact[]): ReadContactDto[] {
    return contacts.map((contact) => this.entityToOutputDto(contact));
  }
}
