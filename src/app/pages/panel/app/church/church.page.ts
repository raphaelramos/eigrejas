import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { extractErrorMessagesFromErrorResponse } from '../../../../shared/errorResponse';
import { FormStatus } from '../../../../shared/formStatus';
import { DataService } from '../../../../services/data.service';
import { PanelService } from '../../../../services/panel.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-church',
  templateUrl: './church.page.html',
  styleUrls: ['./church.page.scss'],
})
export class ChurchPage implements OnInit {

  id = 1;
  model = 'church';
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  phoneMask = '(99) 99999-9999';
  cnpjMask = '99.999.999/9999-99';
  cpfMask = '999.999.999-99';
  initCountry = '31';
  countries = [];
  states = [];
  cities = [];

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private alertService: AlertService,
    private dataService: DataService,
    private navCrtl: NavController
  ) { }

  ngOnInit() {
    this.initForm();

    this.panelService.get(this.model, this.id).subscribe(
      data => {
        Object.keys(data).forEach(name => {
          if (data[name]) {
            this.onRegisterForm.patchValue({
              [name]: String(data[name])
            })
          }
        });
      }
    );
  }

  ionViewDidEnter() {
    this.dataService.getGeo(this.initCountry).subscribe(res => {
      this.countries = res.countries;
      this.states = res.states;
      this.onRegisterForm.controls['country'].setValue(this.initCountry, { emitEvent: false });
    });
  }

  initForm() {
    this.onRegisterForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'short_name': [null],
      'phone_code': ['+55'],
      'phone': [null],
      'email': [null, Validators.compose([
        Validators.email
      ])],
      'country': [null],
      'state': [null],
      'city': [null],
      'address': [null],
      'cnpj': [null],
      'responsible_name': [null, Validators.compose([
        Validators.required
      ])],
      'responsible_cpf': [null, Validators.compose([
        Validators.required
      ])],
      'responsible_phone': [null],
      'status': [1]
    });
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

  save() {
    this.saving = true;
    this.panelService.post(this.model, this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        this.alertService.presentToast(data['message']);
        this.navCrtl.navigateRoot('/panel');
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }
}
