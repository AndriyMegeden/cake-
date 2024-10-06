import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { generalService } from '../generall.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  profile = {
    id: '',
    name:'',
    email:''
  }

  recepts:any = [];

  constructor(public nav:NavController, public generalService:generalService) {
  }

  back(){
    this.nav.back();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.profile = JSON.parse(localStorage.getItem('profile') as any);
    this.generalService.get('favorites/'+this.profile.id).then(async res =>{

      
      for await (let rec of res.data) {
        rec.access = true;
        if (rec.premium == 1) rec.access = await this.generalService.checkAccess(rec.created);
      }

      this.recepts = res.data;
    })
  }

}
