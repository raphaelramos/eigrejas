import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';

import { Storage } from '@capacitor/storage';

import { extractErrorMessagesFromErrorResponse } from '../../../shared/errorResponse';
import { FormStatus } from '../../../shared/formStatus';
import { ApiProvider } from '../../../services/api'
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  device = this.app.device;
  phoneMask = '(99) 99999-9999';
  saving = false;
  allow_member_register = false;

  constructor(private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private navCrtl: NavController,
    private route: Router,
    private alertService: AlertService,
    private app: ApiProvider
  ) { }
  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'last_name': [null, Validators.compose([
        Validators.required
      ])],
      'phone': [null],
      'email': [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'password_confirmation': [null, Validators.compose([
        Validators.required, this.matchValidator.bind(this)
      ])],
      'member': [true],
      'sex': [''],
      'marital_status': [''],
      'birth_date': [''],
      'baptism_date': [''],
      'district': [''],
      'address': ['']
    });

    this.app.infoChurch.subscribe(res => {
      if (res) {
        this.allow_member_register = !!res.allow_member_register_status;
      }
    });
  }

  matchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fromValue = control.value;
    if(this.onRegisterForm) {
      const toValue = (<FormGroup>this.onRegisterForm.get('password')).value;
      if (fromValue && toValue && fromValue === toValue) {
        return null
      }
      return { 'fieldMatch' : true };
    }
  }

  signUp() {
    this.saving = true;
    this.authService.register(this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        const login = {
          email: this.onRegisterForm.value.email,
          password: this.onRegisterForm.value.password,
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
              this.alertService.presentToast("Bem-vindo");
              this.navCtrl.navigateRoot('/home');
            });
          }
        );
      (errorResponse: HttpErrorResponse) => {
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    })
  }

  checkMember() {
    this.onRegisterForm.get('member').setValue(!this.onRegisterForm.get('member').value);
  }

  privacy() {
    this.app.openUrlApp('https://eigrejas.com/app/privacidade?app');
  }

  goToBack () {
    this.navCrtl.back();
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }

  goToVerify() {
    this.route.navigate(['/verify']);
  }
}