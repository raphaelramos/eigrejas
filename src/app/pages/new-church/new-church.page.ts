import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { extractErrorMessagesFromErrorResponse } from '../../shared/errorResponse';
import { FormStatus } from '../../shared/formStatus';
import { ApiProvider } from '../../services/api'
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { NavExtrasService } from '../../services/nav.service';

@Component({
  selector: 'app-new-church',
  templateUrl: './new-church.page.html',
  styleUrls: ['./new-church.page.scss'],
})
export class NewChurchPage implements OnInit {

  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  phoneMask = '(99) 99999-9999';
  device = this.app.device;
  saving = false;
  initCountry = '31';
  domainExists = false;
  countries;
  states;
  cities;

  constructor(
    private formBuilder: FormBuilder,
    private app: ApiProvider,
    private navCrtl: NavController,
    private authService: AuthService,
    private dataService: DataService,
    private alertService: AlertService,
    public navExtras: NavExtrasService,
    private route: Router,
  ) { }

  ngOnInit() {
    if (this.app.token) {
      this.authService.logout();
    }

    const regYoutube = '^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$';
    const regDomain = '^[a-zA-Z0-9-]*$';
  
    this.onRegisterForm = this.formBuilder.group({
      'user_name': [null, Validators.compose([
        Validators.required
      ])],
      'user_last_name': [null, Validators.compose([
        Validators.required
      ])],
      'user_phone_code': ['55'],
      'user_phone': [null],
      'user_email': [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'password_confirmation': [null, Validators.compose([
        Validators.required, this.matchValidator.bind(this)
      ])],
      'church': [null, Validators.compose([
        Validators.required
      ])],
      'short_church': [null],
      'phone_code': ['55', Validators.compose([
        Validators.required
      ])],
      'phone': [null],
      'country': [null],
      'state': [null],
      'city': [null],
      'address': [null],
      'email': [null, Validators.compose([
        Validators.email
      ])],
      'youtube': [null, Validators.compose([
        Validators.pattern(regYoutube)
      ])],
      'domain': [null, Validators.compose([
        Validators.required,
        Validators.pattern(regDomain)
      ])]
    });
  }

  ionViewDidEnter() {
    this.dataService.getGeo(this.initCountry).subscribe(res => {
      this.countries = res.countries;
      this.states = res.states;
      this.onRegisterForm.controls['country'].setValue(this.initCountry, { emitEvent: false });
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

  changeCountry(event) {
    this.states = [];
    this.onRegisterForm.controls['state'].setValue(null, { emitEvent: false });
    this.onRegisterForm.controls['city'].setValue(null, { emitEvent: false });

    const country_id = event.srcElement.value;
    this.dataService.getStates(country_id).subscribe(res => {
      this.states = res;
    });
  }

  changeState(event) {
    this.cities = [];
    this.onRegisterForm.controls['city'].setValue(null, { emitEvent: false });

    const state_id = event.srcElement.value;
    if (state_id) {
      this.dataService.getCities(state_id).subscribe(res => {
        this.cities = res;
      });
    }
  }

  checkDomain(event) {
    const domain = event.srcElement.value;
    if (domain) {
      this.dataService.getChurchesCheckDomain(domain).subscribe(res => {
        if (res > 0) {
          this.domainExists = true;
        } else {
          this.domainExists = false;
        }
      });
    }
  }

  signUp() {
    this.saving = true;
    this.dataService.postChurch(this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;

        const login = {
          domain: this.onRegisterForm.value.domain,
          email: this.onRegisterForm.value.user_email,
          password: this.onRegisterForm.value.password,
          device_name: `${this.device.platform} ${this.device.model}`
        }

        this.app.storeChurch(this.onRegisterForm.value.domain);
        
        this.alertService.presentToast(data['message']);

        this.navExtras.setExtras(login);
        this.goToWelcome();        
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }

  terms() {
    this.app.openUrlApp('https://eigrejas.com/app/termos?app');
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

  goToWelcome() {
    this.route.navigate(['/welcome']);
  }
}