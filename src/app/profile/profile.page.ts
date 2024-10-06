import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { createMask } from '@ngneat/input-mask';
import { generalService } from '../generall.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  content = {
    inst_link: this.translate.instant('INSTAGRAM'),
    tg_link: this.translate.instant('TELEGRAM'),
    suport_email: this.translate.instant('EMAIL_SUPPORT'),
    support_tg: this.translate.instant('TELEGRAM_SUPPORT'),
  }

  profile = {
    name: '',
    email: ''
  }

  constructor(public nav: NavController, public generalService:generalService, public translate: TranslateService, public alertCtrl: AlertController) {
    this.profile = JSON.parse(localStorage.getItem('profile') as any);
  }

  back() {
    this.nav.back();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.nav.navigateRoot('/language')
  }

  async delete() {
    await (
      await this.alertCtrl.create({
        header: this.translate.instant('CONFIRM_DELETE'),
        message: this.translate.instant('CONFIRM_DELETE_DESCRIPTION'),
        buttons: [{
          text: this.translate.instant('CANCEL')
        }, {
          text: this.translate.instant('DELETE'),
          handler:() => {
            this.generalService.post('delete_profile',{token:localStorage.getItem('token')}).then(res => {
              localStorage.clear();
              this.nav.navigateRoot('/language')
            })
          }
        }]
      })
    ).present();
  }

}
