import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { generalService } from '../generall.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications:any = [];

  constructor(public nav:NavController, public generalService:generalService) {
  }

  back(){
    this.nav.back();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.generalService.get('notifications').then(async notifications =>{
      this.notifications = notifications.data.reverse();
    })
  }

}
