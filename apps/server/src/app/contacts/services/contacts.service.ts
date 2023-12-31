import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CONTACT_MODEL } from '../../../constants';
import { Contact } from '../models/contact.schema';
import { Model } from 'mongoose';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactMapper } from '../mappers/contact.mapper';
import { ReadContactDto } from '../dto/read-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_MODEL) private readonly contactModel: Model<Contact>
  ) {}

  create(createContactDto: CreateContactDto, userId: string) {
    const modifiedAt = new Date().toISOString();

    return this.contactModel.create({
      ...createContactDto,
      ownerId: userId,
      modifiedAt,
    });
  }

  async findAll(userId: string): Promise<ReadContactDto[]> {
    const contacts = await this.contactModel.find({ ownerId: userId });
    return ContactMapper.entitiesToOutputDtos(contacts);
  }

  async findAllForAdmin(): Promise<ReadContactDto[]> {
    const contacts = await this.contactModel.find();
    return ContactMapper.entitiesToOutputDtos(contacts);
  }

  async findOne(id: string, userId: string): Promise<ReadContactDto> {
    const contact = await this.findOneForAdmin(id);

    if (contact.ownerId !== userId) {
      throw new ForbiddenException();
    }

    return contact;
  }

  async findOneForAdmin(id: string): Promise<ReadContactDto> {
    const contact = await this.contactModel.findOne({ _id: id });
    return ContactMapper.entityToOutputDto(contact);
  }

  async update(id: string, updateContactDto: UpdateContactDto, userId: string) {
    await this.findOne(id, userId);

    const modifiedAt = new Date().toISOString();

    return this.contactModel.findOneAndUpdate(
      { _id: id },
      { ...updateContactDto, modifiedAt },
      {
        new: true,
      }
    );
  }

  updateForAdmin(id: string, updateContactDto: UpdateContactDto) {
    return this.contactModel.findOneAndUpdate({ _id: id }, updateContactDto, {
      new: true,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.contactModel.findOneAndDelete({ _id: id });
  }

  async removeForAdmin(id: string) {
    return this.contactModel.findOneAndDelete({ _id: id });
  }
}
