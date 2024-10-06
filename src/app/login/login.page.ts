import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { generalService } from '../generall.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    if (this.data.email == '' || this.data.password == '') {
      this.generalService.showError(this.translate.instant('FILL_ALL_FIELDS'));
      return;
    }

    if (!this.generalService.validateEmail(this.data.email)) {
      this.generalService.showError(this.translate.instant('INPUT_CORRECT_EMAIL'));
      return;
    }

    this.generalService.post('login', this.data).then(res => {
      localStorage.setItem('token', res.data.token);
      this.router.navigateByUrl('/home');
    }).catch(err => {
      this.generalService.showError(this.translate.instant('USER_NOT_FOUND'));
      return;
    })
  }

}
