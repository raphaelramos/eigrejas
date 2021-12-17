import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { FormlyFieldConfig } from '@ngx-formly/core';

import { extractErrorMessagesFromErrorResponse } from 'src/app/shared/errorResponse';
import { FormStatus } from 'src/app/shared/formStatus';
import { PanelService } from 'src/app/services/panel.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  id: string;
  report_id: string;
  model = 'group-report';
  saving = false;
  form = new FormGroup({});
  formStatus = new FormStatus();
  modelForm = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'date',
      type: 'datetime',
      templateOptions: {
        label: 'Mês',
        placeholder: 'Selecione',
        displayFormat: 'MM/YYYY',
        cancelText: 'Cancelar',
        doneText: 'Confirmar',
        required: true,
      },
    },
    {
      key: 'members',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Quantidade Membros',
        placeholder: '',
        required: true,
      }
    },
    {
      key: 'guests',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Quantidade Convidados',
        placeholder: '',
        required: true,
      }
    },
    {
      key: 'kids',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Crianças participantes',
        placeholder: '',
        required: false,
      }
    },
    {
      key: 'baptized',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Novos batizados no mês',
        placeholder: '',
        required: false,
      }
    },
    {
      key: 'note',
      type: 'textarea',
      templateOptions: {
        label: 'Observação',
        placeholder: '',
        required: false,
      }
    },

    {
      template: '<ion-label class="forgot_lbl">Temas</ion-label>',
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'theme1',
          templateOptions: {
            label: '1ª Semana',
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'theme2',
          templateOptions: {
            label: '2ª Semana',
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'theme3',
          templateOptions: {
            label: '3ª Semana',
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'theme4',
          templateOptions: {
            label: '4ª Semana',
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'theme5',
          templateOptions: {
            label: '5ª Semana',
          },
        },
      ],
    }
  ];
  
  constructor(
    private panelService: PanelService,
    private alertService: AlertService,
    private navCrtl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.report_id = this.route.snapshot.paramMap.get('report_id');

    this.modelForm = { group_id: this.id };
    if (this.report_id) {
      this.panelService.get(this.model, this.report_id).subscribe(
        data => {
         this.modelForm = data;
        }
      );
    }
  }

  onSubmit(value) {
    console.log(value);

    this.saving = true;
    this.panelService.post(this.model, value).subscribe(
      data => {
        this.saving = false;
        this.alertService.presentToast(data['message']);
        this.navCrtl.navigateRoot(`/panel/groups/info/${this.id}`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.saving = false;
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        this.formStatus.onFormSubmitResponse({success: false, messages: messages});
      }
    );
  }

}
