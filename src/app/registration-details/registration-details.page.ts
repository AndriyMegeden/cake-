import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { generalService } from '../generall.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.page.html',
  styleUrls: ['./registration-details.page.scss'],
})
export class RegistrationDetailsPage implements OnInit {
  phoneMask = createMask('+38(099) 999-99-99');

  data = {
    name: '',
    phone: ''
  }

  constructor(public nav: NavController, public translate:TranslateService, public generalService: generalService, public router: Router) { }

  back() {
    this.nav.back();
  }

  registration() {
    if (this.data.name == '' || this.data.phone == '') {
      this.generalService.showError(this.translate.instant('FILL_ALL_FIELDS'));
      return;
    }

    let data = JSON.parse(localStorage.getItem('registration_data') as any);

    data = { ...data, ...this.data };

    this.generalService.post('registration', data).then(res => {
      localStorage.setItem('token', res.data.token);
      this.router.navigateByUrl('/home');
    }).catch(err => {
      this.generalService.showError(this.translate.instant('EMAIL_PHONE_USED'));
      return;
    })
  }

  ngOnInit() {
  }

}
