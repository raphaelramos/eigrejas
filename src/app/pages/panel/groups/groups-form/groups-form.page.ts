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

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.page.html',
  styleUrls: ['./groups-form.page.scss'],
})
export class GroupsFormPage implements OnInit {

  id: string;
  model = 'group';
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  phoneMask = '(99) 99999-9999';
  initCountry = '31';
  places = [];
  networks = [];
  members = [];
  pastors = [];
  days = [
    { id: 1, name: 'Domingo' },
    { id: 2, name: 'Segunda-feira' },
    { id: 3, name: 'Terça-feira' },
    { id: 4, name: 'Quarta-feira' },
    { id: 5, name: 'Quinta-feira' },
    { id: 6, name: 'Sexta-feira' },
    { id: 7, name: 'Sábado' }
];

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private dataService: DataService,
    private alertService: AlertService,
    private navCrtl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();

    this.panelService.getFilters('places,members,networks,pastors').subscribe(res => {
      this.places = res.places;
      this.members = res.members;
      this.networks = res.networks;
      this.pastors = res.pastors;
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
      'opening_date': [''],
      'finish_date': [''],
      'day': [''],
      'schedule': [''],
      'network_id': [''],
      'pastor_id': [''],
      'leader_id': [''],
      'supervisor_id': [''],
      'place_id': [''],
      'phone': [''],
      'country': [''],
      'state': [''],
      'city': [''],
      'district': [''],
      'address': ['']
    });
  }

  save() {
    this.saving = true;
    this.panelService.post(this.model, this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        this.alertService.presentToast(data['message']);
        this.navCrtl.navigateRoot('/panel/groups');
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }
}

