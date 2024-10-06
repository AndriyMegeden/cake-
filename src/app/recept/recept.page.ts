import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { generalService } from '../generall.service';
import {DomSanitizer} from '@angular/platform-browser';

import * as moment from 'moment';

register();

@Component({
  selector: 'app-recept',
  templateUrl: './recept.page.html',
  styleUrls: ['./recept.page.scss'],
})
export class ReceptPage implements OnInit {

  subscriptions = [
    {
      name: '1_MONTH',
      sub_id: 'devpro',
      price: 100,
      term: 1
    },
    {
      name: '6_MONTH',
      sub_id: 'plan3',
      price: 400,
      term: 6
    },
    {
      name: '12_MONTH',
      sub_id: 'plan12',
      price: 1000,
      term: 12
    },
  ]

  public swiper!: Swiper;

  id = 1;
  recept: any = {
    premium: null
  }
  banner: any = [];
  profile: any = {
    id: '',
    name: '',
    premium: false
  }

  image = null;

  active = false;
  selected = '';
  active_info: any = {};

  loaded = false;
  constructor(public route: ActivatedRoute, private sanitizer: DomSanitizer, public loadingCtrl:LoadingController, public router: Router, public nav: NavController, public generalService: generalService) {
    this.id = Number(route.snapshot.paramMap.get('id'));
    this.profile = JSON.parse(localStorage.getItem('profile') as any);
    let active = JSON.parse(localStorage.getItem('active') as any);

    if (active) {
      if (moment(active.active) >= moment()) {
        this.active = true
      }
    }

    this.getData();
  }

  async getData() {
    let loader = await this.loadingCtrl.create();
    await loader.present();
    this.generalService.post('recept/' + this.id, { user_id: this.profile.id }).then(async res => {
      res.data.recept.same = JSON.parse(res.data.recept.same);

      console.log(res.data.recept.content)

      for await (let rec of res.data.recept.same) {
        rec.access = true;
        if (rec.premium == 1) rec.access = await this.generalService.checkAccess(rec.created);
      }

      // res.data.recept.steps = JSON.parse(res.data.recept.steps);

      // for await (let step of res.data.recept.steps) {

      //   console.log(step.ingredients.ua);
      //   console.log(step.ingredients.ru);

      //   step.ingredients.ua = step.ingredients.ua.split('</p>');
      //   if (step.ingredients.ua.length == 1 && step.ingredients.ua[0] == '') {
      //     step.ingredients.ua = []
      //   } else {
      //     for (let i = 0; i < step.ingredients.ua.length; i++) {
      //       step.ingredients.ua[i] = step.ingredients.ua[i].replace(/<[^>]*>?/gm, '');
      //     }
      //   }

      //   if (step.ingredients.ua.length == 1 && step.ingredients.ua[0] == '') {
      //     step.ingredients.ua = []
      //   } else {
      //     step.ingredients.ru = step.ingredients.ru.split('</p>');
      //     for (let i = 0; i < step.ingredients.ru.length; i++) {
      //       step.ingredients.ru[i] = step.ingredients.ru[i].replace(/<[^>]*>?/gm, '');
      //     }
      //   }

      // }

      // res.data.recept.ingredients = JSON.parse(res.data.recept.ingredients);

      // res.data.recept.ingredients.ua = res.data.recept.ingredients.ua.split('</p>');
      // if (res.data.recept.ingredients.ua.length == 1 && res.data.recept.ingredients.ua[0] == '') {
      //   res.data.recept.ingredients.ua = []
      // } else {
      //   for (let i = 0; i < res.data.recept.ingredients.ua.length; i++) {
      //     res.data.recept.ingredients.ua[i] = res.data.recept.ingredients.ua[i].replace(/<[^>]*>?/gm, '');
      //   }
      // }

      // res.data.recept.ingredients.ru = res.data.recept.ingredients.ru.split('</p>');
      // if (res.data.recept.ingredients.ru.length == 1 && res.data.recept.ingredients.ru[0] == '') {
      //   res.data.recept.ingredients.ru = []
      // } else {
      //   for (let i = 0; i < res.data.recept.ingredients.ru.length; i++) {
      //     res.data.recept.ingredients.ru[i] = res.data.recept.ingredients.ru[i].replace(/<[^>]*>?/gm, '');
      //   }
      // }

      res.data.recept.access = true;
      if (res.data.recept.premium == 1) res.data.recept.access = await this.generalService.checkAccess(res.data.recept.created);

      res.data.recept = await this.validateLang(res.data.recept);

      this.recept = res.data.recept;
      this.recept.content = this.recept.content.replaceAll("<iframe ", "<iframe style='width:100%;' ")
      this.recept.content = this.sanitizer.bypassSecurityTrustHtml(this.recept.content);

      this.loaded = true;

      await loader.dismiss();

    }, async err => {
      await loader.dismiss();
    })

    this.generalService.get('banners').then(async res => {
      this.banner = res.data.filter((banner: any) => banner.type == 'recept' && banner.recept_id == this.id)[0];

      if (this.active && this.banner) {
        this.generalService.showBanner(this.banner.id);
      }
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

  back() {
    this.nav.back();
  }

  ngOnInit() {
  }

  add_favorite() {
    this.generalService.get('add_favorite/' + this.id + '/' + this.profile.id).then(res => {
      this.getData();
    })
  }

  remove_favorite() {
    this.generalService.get('remove_favorite/' + this.id + '/' + this.profile.id).then(res => {
      this.getData();
    })
  }

  check_buyed() {
    let time = moment().unix() + '000';

    this.generalService.post('valid_sub/' + time + '/' + this.selected, { token: localStorage.getItem('token') }).then(res => {
      this.getProfile();
      this.selected = '';
    });
  }

  getProfile() {

    this.generalService.post('profile', { token: localStorage.getItem('token') }).then(res => {
      localStorage.setItem('profile', JSON.stringify(res.data.user));

      this.generalService.post('current_subscription', { id: res.data.user.id }).then(res1 => {
        this.active_info = res1.data;
        localStorage.setItem('active', JSON.stringify(this.active_info));


        if (moment(this.active_info.active) >= moment()) {
          this.active = true
        } else {
          this.active = false;
        }

        this.getData();

      }, err => {
        localStorage.removeItem('active')
      });
    });
  }

  async validateLang(recept){

    if(localStorage.getItem('language') == 'ru'){

      recept.name = recept.name_ru;
      recept.shortDescription = recept.shortDescription_ru;

      recept.ingredients.ua = recept.ingredients.ru;

      for await(let step of recept.steps){
        step.name.ua = step.name.ru;
        step.ua = step.ru;
        step.ingredients.ua = step.ingredients.ru;
      }

    }

    return recept;
  }

}
