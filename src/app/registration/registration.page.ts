import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { generalService } from '../generall.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  data = {
    email:'',
    password:'',
    password_again:''
  }

  type_password = 'password';
  type_password_again = 'password';
  confirmation = false;

  constructor(public nav:NavController, public router:Router, public translate:TranslateService, public generalService:generalService, public alertCtrl:AlertController) { }

  back(){
    this.nav.back();
  }

  ngOnInit() {
  }

  registration(){
    if(this.data.email == '' || this.data.password == '' || this.data.password_again == ''){
      this.generalService.showError(this.translate.instant('FILL_ALL_FIELDS'));
      return;
    }

    if(!this.generalService.validateEmail(this.data.email)){
      this.generalService.showError(this.translate.instant('FILL_ALL_FIELDS'));
      return;
    }
    
    if(this.data.password != this.data.password_again){
      this.generalService.showError(this.translate.instant('PASSWORDS_NOT_EQUALS'));
      return;
    }

    if(!this.confirmation){
      this.generalService.showError(this.translate.instant('CONFIRM_RULES'));
      return;
    }

    localStorage.setItem('registration_data', JSON.stringify(this.data));
    this.router.navigate(['/registration-details'])
  }

}
