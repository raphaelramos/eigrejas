import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';

import { extractErrorMessagesFromErrorResponse } from '../../shared/errorResponse';
import { FormStatus } from '../../shared/formStatus';
import { ApiProvider } from '../../services/api'
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  onContactForm: FormGroup;
  formStatus = new FormStatus();
  device = this.app.device;
  saving = false;

  constructor(private formBuilder: FormBuilder,
    private TP: TopicsService,
    private route: Router,
    private alertService: AlertService,
    private app: ApiProvider
  ) { }
  ngOnInit() {
    this.onContactForm = this.formBuilder.group({
      'contact_name': [null, Validators.compose([
        Validators.required
      ])],
      'contact_subject': [null, Validators.compose([
        Validators.required
      ])],
      'contact_message': [null, Validators.compose([
        Validators.required
      ])],
      'contact_email': [null, Validators.compose([
        Validators.required, Validators.email
      ])]
    });
  }

  matchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fromValue = control.value;
    if(this.onContactForm) {
      const toValue = (<FormGroup>this.onContactForm.get('password')).value;
      if (fromValue && toValue && fromValue === toValue) {
        return null
      }
      return { 'fieldMatch' : true };
    }
  }

  send() {
    this.saving = true;
    this.TP.postContact(this.onContactForm.value).subscribe(
      data => {
        this.saving = false;
        this.onContactForm.reset();
        this.alertService.presentToast(data['msg']);
      },
      (errorResponse: HttpErrorResponse) => {
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }

  goToHome() {
    this.route.navigate(['/home']);
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }

  goToVerify() {
    this.route.navigate(['/verify']);
  }
}