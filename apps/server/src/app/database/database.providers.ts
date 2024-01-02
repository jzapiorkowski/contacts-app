import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../../constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGODB_URI as string),
  },
];
