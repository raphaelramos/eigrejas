import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { extractErrorMessagesFromErrorResponse } from '../../../shared/errorResponse';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  load = false;
  f: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private navCrtl: NavController, private route: Router) { }

  ngOnInit() {
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  recovery() {
    this.load = true;
    this.authService.recovery(this.f.value).subscribe(
      data => {
        this.load = false;
        this.navCrtl.navigateRoot('/login');
        this.alertService.presentToast(data['message']);
      },
        (errorResponse: HttpErrorResponse) => {
          this.load = false;
          const messages = extractErrorMessagesFromErrorResponse(errorResponse);
          this.alertService.presentToast(messages);
        },
      () => {
        
      }
    );
  }

  goToBack () {
    this.navCrtl.back();
  }

  goToRegister() {
    this.route.navigate(['/register']);
  }

}
