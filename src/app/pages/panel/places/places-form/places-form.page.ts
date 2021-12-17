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
  selector: 'app-places-form',
  templateUrl: './places-form.page.html',
  styleUrls: ['./places-form.page.scss'],
})
export class PlacesFormPage implements OnInit {

  id: string;
  model = 'place';
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  phoneMask = '(99) 99999-9999';

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private alertService: AlertService,
    private navCrtl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();

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
      'phone': [''],
      'state': [''],
      'city': [''],
      'district': [''],
      'address': [''],
      'schedules': [''],
      'status': ['1']
    });
  }

  save() {
    this.saving = true;
    this.panelService.post(this.model, this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        this.alertService.presentToast(data['message']);
        this.navCrtl.navigateRoot('/panel/places');
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }
}