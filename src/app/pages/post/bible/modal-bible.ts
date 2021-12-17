import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-bible',
  templateUrl: 'bible.page.html'
})
export class ModalBible {
  @Input() title: string;
  @Input() text: string;
  @Input() font: string;

  constructor(public modalController: ModalController) {}
}