import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Storage } from '@capacitor/storage';

import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { extractErrorMessagesFromErrorResponse } from '../../../shared/errorResponse';
import { ApiProvider } from '../../../services/api'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginError = false;
    load = false;
    onLoginForm: FormGroup;
    device = this.app.device;
    allow_register = false;

    constructor(
        private formBuilder: FormBuilder,
        private navCtrl: NavController,
        private authService: AuthService,
        private alertService: AlertService,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private app: ApiProvider,
        private navCrtl: NavController,
        private route: Router
      ) { }

    ngOnInit() {
        this.onLoginForm = this.formBuilder.group({
          'email': [null, Validators.compose([
            Validators.required
          ])],
          'password': [null, Validators.compose([
            Validators.required
          ])]
        });
    
        this.onLoginForm.controls['email'].valueChanges.subscribe(value => {
          this.mask(value);
        });

        this.app.infoChurch.subscribe(res => {
            if (res) {
                this.allow_register = !!res.allow_register_status;
            }
        });
    }

    async forgotPass() {
    const alert = await this.alertCtrl.create({
        header: 'Esqueceu a Senha?',
        message: 'Insira seu email.',
        inputs: [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
        }
        ],
        buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            console.log('Confirm Cancel');
            }
        }, {
            text: 'Confirmar',
            handler: data => {
            this.authService.recovery(data.email).subscribe(
                data => {
                this.alertService.presentToast(data['message']);
                },
                (errorResponse: HttpErrorResponse) => {
                    const messages = extractErrorMessagesFromErrorResponse(errorResponse);
                    this.alertService.presentToast(messages);
                },
                () => {
                
                }
            );
            }
        }
        ]
    });

        await alert.present();
    }

    emailIsValid(email) {
        return /\S+@\S+\.\S+/.test(email)
    }

    login() {
        this.load = true;
        this.loginError = false;

        let email = this.onLoginForm.value.email;
        if(!this.emailIsValid(email)) {
            email = this.replaceMask(this.onLoginForm.value.email);
        }
        const login = {
            email: email,
            password: this.onLoginForm.value.password,
            device_name: `${this.device.platform} ${this.device.model}`
        }
        this.authService.login(login).subscribe(
            token => {
                this.authService.user(token).subscribe(data => {
                    Storage.set({
                        key: 'user',
                        value: JSON.stringify(data),
                    });
                    this.app.userData.next(data);
                    this.load = false;
                    this.alertService.presentToast("Bem-vindo");
                    this.navCtrl.navigateRoot('/panel');
                });
            },
            (errorResponse: HttpErrorResponse) => {
                // Erro nos dados
                if (errorResponse.status === 400) {
                    this.loginError = true;
                    return this.alertService.presentToast("Usuário ou senha incorretos");
                    // Ultrapassou limite de tentativas
                } else if (errorResponse.status === 429) {
                    this.loginError = true;
                    return this.alertService.presentToast("Limite de tentativas. Você poderá entrar daqui 1 minuto");
                }
                // Sem conexão com o servidor
                this.loginError = true;
                return this.alertService.presentToast("Sem conexão com o servidor");
            }
        );
    }

    replaceMask(value) {
        return value.replace('(', '')
            .replace(')', '')
            .replace(' ', '')
            .replace('-', '');
    }

    mask(value) {
        let string = value.replace(/[0-9]/g, '')
        string = this.replaceMask(string);

        // contains letters
        if (string || value.length < 5) {
            return;
        }

        // apply phone mask
        let patternM = '(**) *****-****';

        let caret = value,
            pattern = patternM,
            reserve = pattern.replace(/\*/, 'g'),
            applied = '',
            ordinal = 0;

        if (value.keyCode === 8 || value.key === 'Backspace' || value.keyCode === 46 || value.key === 'Delete') {
            if (value.length) {
                //remove all trailing formatting
                while (value.length && pattern[value.length] && pattern[value.length] !== '*') {
                    value = value.substring(0, value.length - 1);
                }
                //remove all leading formatting to restore placeholder
                if (pattern.substring(0, value.length).indexOf('*') < 0) {
                    value = value.substring(0, value.length - 1);
                }
            }
        }
        
        //apply mask characters 
        for (var i = 0; i < value.length; i++) {
            //enforce pattern limit
            if (i < pattern.length) {
                //match mask
                if (value[i] === pattern[ordinal]) {
                    applied += value[i];
                    ordinal++;
                } else if (reserve.indexOf(value[i]) > -1) {
                    //skip other reserved characters
                } else {
                    //apply leading formatting
                    while (ordinal < pattern.length && pattern[ordinal] !== '*') {
                        applied += pattern[ordinal];
                        ordinal++;
                    }
                    applied += value[i];
                    ordinal++;
                    //apply trailing formatting
                    while (ordinal < pattern.length && pattern[ordinal] !== '*') {
                        applied += pattern[ordinal];
                        ordinal++;
                    }
                }
            }
        }
        this.onLoginForm.controls['email'].patchValue(applied, {emitEvent: false});
    }

    goToBack () {
        this.navCrtl.back();
    }

    goToRegister() {
        this.route.navigate(['/register']);
    }

    goToForgot() {
        this.route.navigate(['/recovery']);
    }

}
