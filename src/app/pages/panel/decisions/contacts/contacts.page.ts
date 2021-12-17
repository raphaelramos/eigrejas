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
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  id: string;
  model = 'decision-contact';
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  contacts = [];
  now: Date = new Date();
  typeContact = {
    1: 'Sim',
    2: 'Não'
  };

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private alertService: AlertService,
    private navCrtl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();

    this.panelService.get(this.model, this.id).subscribe(
      data => {
        this.contacts = data;
      }
    );
  }

  initForm() {
    this.onRegisterForm = this.formBuilder.group({
      'id': [''],
      'decision_id': [this.id],
      'contact': [''],
      'type_contact': ['']      
    });
  }

  save() {
    this.saving = true;
    this.panelService.post(this.model, this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        this.alertService.presentToast(data['message']);
        this.contacts.unshift({
          created_at: this.now,
          type_contact: this.onRegisterForm.value.type_contact,
          contact: this.onRegisterForm.value.contact
        });
        this.onRegisterForm.reset();
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }
}

