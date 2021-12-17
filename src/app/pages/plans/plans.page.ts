import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { extractErrorMessagesFromErrorResponse } from '../../shared/errorResponse';
import { FormStatus } from '../../shared/formStatus';
import { DataService } from '../../services/data.service';
import { ApiProvider } from '../../services/api';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  id: string;
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  planInfo = false;
  plan: Plan;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public app: ApiProvider
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.onRegisterForm = this.formBuilder.group({
      'name': ['', Validators.compose([
        Validators.required
      ])],
      'members': ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  save() {
    this.saving = true;
    this.dataService.plans(this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        this.plan = data;
        this.planInfo = true;
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }

  contact() {
    this.app.openUrlApp('https://eigrejas.com/app/contato?app');
  }
}
