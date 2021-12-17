import { Directive, HostListener } from '@angular/core';
import { ApiProvider } from '../../services/api';
import { ModalController } from '@ionic/angular';

import { BiblePage } from './bible/bible.page';

@Directive({
  selector: '[routeTransformer]'
})
export class RouteTransformerDirective {

  constructor(
    private modalCtrl: ModalController,
    public app: ApiProvider) {}

  @HostListener('click', ['$event'])
  public onClick(e) {
    let event = e || window.event;
    let element: any = event.target || event.srcElement;

    if(element.tagName !== 'A')
    element = element.parentNode;
    if(element.tagName == 'A' && element.href !== undefined) {
      event.preventDefault();
      return this.app.openUrl([element.href]);

      
      let protocol = element.href.substr(0, element.href.indexOf(':'));

      // open in bible only http protocol. use https for open links
      if (protocol == 'https') {
        return this.app.openUrl([element.href]);
      }

      // let title = [element.text]
      // let verse = element.href.split('#')[1]
      // let text = '';
      
      // this.app.getBible()
      // .subscribe(data => {
      //   // parts verse
      //   let book = verse.split('.').shift(); // get book number
      //   verse = verse.split('.').pop();
      //   let cap = (verse.split(':')[0]) -1;

      //   let i = 0; // start verse
      //   let end = 0; //end verse
      //   let list = [] // list verses
      //   let verses;

      //   // verify exist verses
      //   if (verse.split(':')[1]) {
      //     verses = verse.split(':')[1];
      //     // star and end verses
      //     i = (verses.split('-')[0]) -1; // first verse
      //     end = (verses.split('-')[1]) -1; // last verse

      //     // list verses
      //     if(!isNaN(verses.split(',')[0])) {
      //       list = verses.split(',');
      //       i = 0;
      //     }
      //   }

      //   if (isNaN(cap) || isNaN(i)) {
      //     text = `<p>Não foi possível abrir este versículo</p>`;
      //     this.show(title, text);
      //     return;
      //   }
        
      //   let bible = data[book-1].chapters[cap];
        
      //   if (isNaN(end) && !(list.length > 0)) {
      //     text += `<p><span class="verse">${i+1}</span> ${ bible[i]}</p>`;
      //   } else if (!(list.length > 0)) {
      //     for (; i-1 < end; i++) {
      //       text += `<p><span class="verse">${i+1}</span> ${ bible[i]}</p>`;
      //     }
      //   } else {
      //     list.forEach(function(verse){
      //       i = Number(verse)-1;
      //       text += `<p><span class="verse">${verse}</span> ${ bible[i]}</p>`;
      //     });
      //   }

      //   this.show(title, text);
      // });
    }
  }

  async show(title, text) {
    let font = this.app.fontSize+'px';
    const modal = await this.modalCtrl.create({
      component: BiblePage,
      cssClass: 'bible-modal',
      showBackdrop: false,
      componentProps: { 
        title: title,
        text: text,
        font: font
      }
    });
 
    return await modal.present();
  }

};