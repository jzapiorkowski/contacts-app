import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthModule } from './auth/auth.module';
import { interceptorsProviders } from './interceptors/interceptors.providers';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [CommonModule, AuthModule, ComponentsModule],
  providers: [LocalStorageService, ...interceptorsProviders],
  exports: [AuthModule, ComponentsModule],
})
export class CoreModule {}
