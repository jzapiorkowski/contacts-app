import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authFormRoutes } from './auth-form.routes';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(authFormRoutes),
  ],
})
export class AuthFormModule {}
