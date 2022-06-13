import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(
        public alertController: AlertController
    ){}

    async message(msg: string) {
        const alert = await this.alertController.create({
          header: 'Houve um erro',
          message: 'Não foi possível carregar',
          buttons: ['OK']
        });

        console.error(msg);
    
        await alert.present();
    }
}
