import { NgModule } from '@angular/core';
import { DynamicBgDirective } from './dynamic-bg.directive';
@NgModule({
  declarations: [
    DynamicBgDirective,
  ],
  exports: [
    DynamicBgDirective,
  ]
})
export class DynamicBgModule { }