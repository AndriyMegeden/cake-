import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { generalService } from '../generall.service';
import { TranslateService } from '@ngx-translate/core';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  phoneMask = createMask('+38(099) 999-99-99');

  email = '';

  profile = {
    name: '',
    email: '',
    phone: ''
  }

  passwords = {
    password: '',
    password_again: ''
  }

  type_password = 'password'
  type_password_again = 'password'

  language = localStorage.getItem('language') as any;

  constructor(public nav: NavController, public generalService: generalService, public translate:TranslateService) {
    this.loadData();
  }

  back() {
    this.nav.back();
  }

  ngOnInit() {
  }

  loadData(){
    this.profile = JSON.parse(localStorage.getItem('profile') as any);
    this.email = String(this.profile.email)

    this.generalService.post('profile', {token:localStorage.getItem('token')}).then(res => {
      localStorage.setItem('profile', JSON.stringify(res.data.user));
      this.profile = res.data.user;
      this.email = String(this.profile.email)
    });
  }

  save() {
    let data: any = {};

    if (this.profile.name == '' || this.profile.email == '' || this.profile.phone == '') {
      this.generalService.showError(this.translate.instant('FILL_ALL_FIELDS'));
      return;
    }

    if (!this.generalService.validateEmail(this.profile.email)) {
      this.generalService.showError(this.translate.instant('INPUT_CORRECT_EMAIL'));
      return;
    }

    data = {
      name: this.profile.name,
      email: this.profile.email,
      phone: this.profile.phone
    }

    if (this.passwords.password != '' || this.passwords.password_again != '') {

      if (this.passwords.password != this.passwords.password_again) {
        this.generalService.showError(this.translate.instant('PASSWORDS_NOT_EQUALS'));
        return;
      } else {
        data.password = this.passwords.password
      }
    }

    console.log(data);

    this.generalService.post('edit_profile', { ...data, ...{ token: localStorage.getItem('token') } }).then(res => {
      localStorage.setItem('profile', JSON.stringify(data));
      this.loadData();

      this.generalService.showAlert(this.translate.instant('PROFILE'), this.translate.instant('CHANGES_SAVED'));
    }).catch(err => {
      this.generalService.showError(this.translate.instant(err.error.message));
      return;
    })

  }

  changeLanguage(event){
    console.log(event);

    this.language = event.target.value;
    localStorage.setItem('language', this.language);
    this.translate.setDefaultLang(this.language)
    this.generalService.showAlert(this.translate.instant('PROFILE'), this.translate.instant('CHANGES_SAVED'));
  }


}
