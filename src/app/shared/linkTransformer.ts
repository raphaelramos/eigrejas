import { Directive, ElementRef, HostListener } from '@angular/core';
import { ApiProvider } from '../services/api';

@Directive({
  selector: '[linkTransformer]'
})
export class LinkTransformerDirective {

  constructor(private el: ElementRef,
    public app: ApiProvider) { }

  @HostListener('click', ['$event'])
  public onClick(e) {
    let event = e || window.event;
    let element: any = event.target || event.srcElement;

    if(element.tagName !== 'A')
    element = element.parentNode;
    if(element.tagName == 'A' && element.href !== undefined) {
      event.preventDefault();
      
      if (this.get_url_extension(element.href) == 'jpg' ) {
        return this.app.openUrl([element.href]);
      }
      
      return this.app.openUrlApp([element.href]);
    }
  }

  get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

};