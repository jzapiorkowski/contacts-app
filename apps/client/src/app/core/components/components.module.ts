import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, PageNotFoundComponent],
  exports: [HomeComponent],
  imports: [CommonModule, MaterialModule, AuthModule, RouterModule],
})
export class ComponentsModule {}
