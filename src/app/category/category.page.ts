import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { generalService } from '../generall.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  id: any = '';

  category: any = {
    name: ''
  };
  recepts: any = [];
  banner: any = [];

  active = false;


  constructor(public generalService: generalService, public router: Router, public route: ActivatedRoute, public nav: NavController) {
  }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    let active = JSON.parse(localStorage.getItem('active') as any);

    if (active) {
      if (moment(active.active) >= moment()) {
        this.active = true
      }
    }

    this.id = this.route.snapshot.paramMap.get('id');
    this.generalService.get('category/' + this.id).then(res => {
      this.category = res.data;
    })

    this.generalService.get('recepts/' + this.id).then(async res => {

      for await (let rec of res.data) {
        rec.access = true;
        if (rec.premium == 1) rec.access = await this.generalService.checkAccess(rec.created);
      }

      this.recepts = res.data;
    })

    this.generalService.get('banners').then(async res => {
      this.banner = res.data.filter((banner: any) => banner.type == 'category' && banner.category_id == this.id)[0];
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

}
