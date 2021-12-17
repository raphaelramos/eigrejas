import { Directive, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[dynamicBg]',
})
export class DynamicBgDirective {

  colors = ['#25262f', '#202342', '#ff8a00', '#0a5687', '#4b0388'];
  color = this.colors[Math.floor(Math.random()*this.colors.length)];
  
  @HostBinding('style')
  get myStyle() {
    return this.sanitizer.bypassSecurityTrustStyle(`background-color: ${this.color};`);
  }

  constructor(public sanitizer:DomSanitizer) {}

}