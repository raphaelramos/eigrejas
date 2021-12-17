import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { extractErrorMessagesFromErrorResponse } from '../../../../shared/errorResponse';
import { FormStatus } from '../../../../shared/formStatus';
import { PanelService } from '../../../../services/panel.service';
import { AlertService } from '../../../../services/alert.service';
import { DataService } from '../../../../services/data.service';

import { ApiProvider } from 'src/app/services/api';

@Component({
  selector: 'app-decisions-form',
  templateUrl: './decisions-form.page.html',
  styleUrls: ['./decisions-form.page.scss'],
})
export class DecisionsFormPage implements OnInit {

  id: string;
  model = 'decision';
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  phoneMask = '(99) 99999-9999';
  initCountry = '31';
  groupName = 'Celula';
  places = [];
  members = [];
  groups = [];
  countries = [];
  states = [];
  cities = [];

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private dataService: DataService,
    private alertService: AlertService,
    private navCrtl: NavController,
    private route: ActivatedRoute,
    public app: ApiProvider
  ) { }

  ngOnInit() {
    this.initForm();

    this.panelService.getFilters('places,members,groups').subscribe(res => {
      this.places = res.places;
      this.members = res.members;
      this.groups = res.groups;
    });

    // set group name
    this.app.names
    .subscribe(res => {
      this.groupName = res.group;
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
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
  }

  initForm() {
    this.onRegisterForm = this.formBuilder.group({
      'id': [''],
      'name': ['', Validators.compose([
        Validators.required
      ])],
      'sex': [''],
      'decision_date': [''],
      'finish_date': [''],
      'age': [''],
      'marital_status': [''],
      'phone': [''],
      'country': [''],
      'state': [''],
      'city': [''],
      'district': [''],
      'address': [''],
      'postal_code': [''],
      'note': [''],
      'place_id': [''],
      'member_id': [''],
      'group_id': ['']
    });
  }

  ionViewDidEnter() {
    let country = this.initCountry;
    // if (this.id) {
    //   country = this.onRegisterForm.controls['country'].value;
    //   console.log('c', country);
    // }
    this.dataService.getGeo(country).subscribe(res => {
      this.countries = res.countries;
      this.states = res.states;
      this.onRegisterForm.controls['country'].setValue(country, { emitEvent: false });
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
        this.navCrtl.navigateRoot('/panel/decisions');
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }
}
