import { NgModule } from '@angular/core';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [ServicesModule, PipesModule],
  exports: [ServicesModule, PipesModule],
})
export class SharedModule {}
