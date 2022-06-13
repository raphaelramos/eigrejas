import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

import { extractErrorMessagesFromErrorResponse } from '../../../../shared/errorResponse';
import { FormStatus } from '../../../../shared/formStatus';
import { PanelService } from '../../../../services/panel.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-count-form',
  templateUrl: './count-form.page.html',
  styleUrls: ['./count-form.page.scss'],
})
export class CountFormPage implements OnInit {

  id: string;
  model = 'count';
  onRegisterForm: FormGroup;
  formStatus = new FormStatus();
  saving = false;
  places = [];
  dateValue: string;
  today = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private alertService: AlertService,
    private navCrtl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();

    this.panelService.getFilters('places').subscribe(res => {
      this.places = res.places;
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

  formatDate(value: string) {
    return format(parseISO(value), 'dd/MM/yyyy H:mm');
  }

  initForm() {
    this.onRegisterForm = this.formBuilder.group({
      'id': [''],
      'date': ['', Validators.compose([
        Validators.required
      ])],
      'place_id': [''],
      'total': [''],
      'decisions': [''],
      'kids': ['']
    });
  }

  save() {
    this.saving = true;
    this.panelService.post(this.model, this.onRegisterForm.value).subscribe(
      data => {
        this.saving = false;
        this.alertService.presentToast(data['message']);
        this.navCrtl.navigateRoot('/panel/count');
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }
}
