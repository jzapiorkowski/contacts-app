import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, CONTACT_MODEL } from '../../../constants';
import { ContactSchema } from './contact.schema';

export const contactProvider = {
  provide: CONTACT_MODEL,
  useFactory: (connection: Connection) =>
    connection.model(CONTACT_MODEL, ContactSchema),
  inject: [DATABASE_CONNECTION],
};
