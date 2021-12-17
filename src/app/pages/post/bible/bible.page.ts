import { Component, Input } from '@angular/core';

@Component({
  selector: 'bible-page',
  templateUrl: 'bible.page.html'
})
export class BiblePage {

  @Input() title: string;
  @Input() text: string;
  @Input() font: string;
  
  constructor() {}

}