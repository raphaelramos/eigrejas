import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { extractErrorMessagesFromErrorResponse } from '../../../../shared/errorResponse';
import { FormStatus } from '../../../../shared/formStatus';
import { PanelService } from '../../../../services/panel.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-members-form',
  templateUrl: './members-form.page.html',
  styleUrls: ['./members-form.page.scss'],
})
export class MembersFormPage implements OnInit {

  id: string;
  groupId: string;
  model = 'member';
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  phoneMask = '(99) 99999-9999';
  places = [];
  roles = [];

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();

    this.panelService.getFilters('places,roles').subscribe(res => {
      this.places = res.places;
      this.roles = res.roles;
    });

    // id member
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

    // id group
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    if (this.groupId) {
      console.log('group', this.groupId)
      this.onRegisterForm.controls['group_id'].setValue(this.groupId);
    }
  }

  initForm() {
    this.onRegisterForm = this.formBuilder.group({
      'id': [''],
      'name': ['', Validators.compose([
        Validators.required
      ])],
      'sex': [''],
      'marital_status': [''],
      'birth_date': [''],
      'baptism_date': [''],
      'phone': [''],
      'email': ['', Validators.compose([
        Validators.email
      ])],
      'state': [''],
      'city': [''],
      'district': [''],
      'address': [''],
      'role_id': [''],
      'place_id': [''],
      'group_id': [''],
      'profile_photo': ['']
    });
  }

  save() {
    this.saving = true;
    this.panelService.post(this.model, this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        this.alertService.presentToast(data['message']);
        this.navCtrl.back();
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }
}