import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-aboutapp',
  templateUrl: './aboutapp.page.html',
  styleUrls: ['./aboutapp.page.scss'],
})
export class AboutappPage implements OnInit {

  constructor(public nav:NavController) { }

  back(){
    this.nav.back();
  }

  ngOnInit() {
  }

}
