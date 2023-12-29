import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [UserModule, AuthModule, ContactsModule],
})
export class AppModule {}
