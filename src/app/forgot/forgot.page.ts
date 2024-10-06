import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { generalService } from '../generall.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  data = {
    email: '',
    password: ''
  }

  type_password = 'password';

  constructor(public nav: NavController, public generalService:generalService, public translate:TranslateService, public router:Router) { }

  back() {
    this.nav.back();
  }

  ngOnInit() {
  }

  login() {
    if (this.data.email == '') {
      this.generalService.showError(this.translate.instant('FILL_ALL_FIELDS'));
      return;
    }

    if (!this.generalService.validateEmail(this.data.email)) {
      this.generalService.showError(this.translate.instant('INPUT_CORRECT_EMAIL'));
      return;
    }

    this.generalService.post('forgot', this.data).then(res => {
      this.generalService.showAlert(this.translate.instant('RECOVERING_PASSWORD'),this.translate.instant('NEW_PASSWORD_SENDED'));
      this.nav.back();
    }).catch(err => {
      this.generalService.showError(this.translate.instant('USER_NOT_FOUND'));
      return;
    })
  }

}
