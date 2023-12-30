import { NgModule } from '@angular/core';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [ServicesModule, PipesModule, ComponentsModule],
  exports: [ServicesModule, PipesModule, ComponentsModule],
})
export class SharedModule {}
