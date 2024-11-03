import { Component } from '@angular/core';
import { generalService } from '../generall.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import OneSignal from 'onesignal-cordova-plugin';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  profile = {
    name: '',
    email: '',
    phone: ''
  }

  categories: any = [];
  banners: any = [];
  courses: any = [];

  banner: any = null;

  active = false;

  constructor(public generalService: generalService, public router: Router, private platform:Platform) {

    platform.ready().then(() => {
      this.OneSignalInit();
      //this.marketing();
    });

    if (localStorage.getItem('token')) {
      this.generalService.get('set_action/' + localStorage.getItem('token')).then(res => { console.log('Set action') });
    }

  }


  getProfile() {

    this.generalService.post('profile', { token: localStorage.getItem('token') }).then(res => {
      localStorage.setItem('profile', JSON.stringify(res.data.user));

      this.generalService.post('current_subscription', { id: res.data.user.id }).then(res1 => {
        localStorage.setItem('active', JSON.stringify(res1.data));

        if (moment(res1.data.active) >= moment()) {
          this.active = true
        } else {
          this.active = false;
        }

      }, err => {
        localStorage.removeItem('active')
      });
    });
  }

  async ionViewWillEnter() {
    await this.generalService.loaderStart();
    this.getProfile();

    this.generalService.get('categories_recepts').then(async res => {

      for await (let category of res.data) {
        for await (let rec of category.recepts) {
          rec.access = true;
          if (rec.premium == 1) rec.access = await this.generalService.checkAccess(rec.created);
        }
      }

      console.log(res.data);

      this.categories = res.data;
    })

    this.generalService.get('banners').then(async res => {
      this.banner = res.data.filter((banner: any) => banner.type == 'main')[0];

      if (this.banner) {
        this.generalService.showBanner(this.banner.id);
      }
    })

    this.generalService.get('courses').then(async res => {
      this.courses = res.data;
    })
  }

  clickBanner() {
    if (this.banner.target_recept_id == 0) {
      window.open(this.banner.url, '_system');
    } else {
      this.router.navigateByUrl('/recept/' + this.banner.target_recept_id);
    }

    this.generalService.clickBanner(this.banner.id);
  }


  OneSignalInit(): void {

    //appID - "7dc31e3b-9ee1-4033-903d-882bab34e29d"

    let that = this;

    // OneSignal.setAppId("bdfb1480-d9ee-4277-a907-63f39251c764");
    OneSignal.setAppId("01185ad3-f8a7-443c-97d7-4e05e09bca7d");

    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log("User accepted notifications: " + accepted);
    });

    this.subscribeLoop();

  }

  subscribeLoop() {
    OneSignal.getDeviceState(async (resp) => {
      if (resp.subscribed == false) {
        setTimeout(() => {
          this.subscribeLoop();
        }, 1000);
      } else {

        this.generalService.get('update_push_token/'+localStorage.getItem('token')+'/'+resp.userId).then(async res => { })
      }
    })
  }

}
