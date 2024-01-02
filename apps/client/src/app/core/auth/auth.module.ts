import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PermissionGuard } from './permission.guard';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthFormComponent],
  providers: [AuthService, AuthGuard, PermissionGuard, LocalStorageService],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(authRoutes),
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
