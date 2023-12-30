import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { MaterialModule } from '../../core/material/material.module';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ConfirmationModalComponent],
})
export class ComponentsModule {}
