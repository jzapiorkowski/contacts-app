import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { contactProvider } from './models/contact.provider';
import { ContactsController } from './controllers/contacts.controller';
import { ContactsService } from './services/contacts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController],
  providers: [contactProvider, ContactsService],
  exports: [],
})
export class ContactsModule {}
