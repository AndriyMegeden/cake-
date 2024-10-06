import { Component, OnInit } from '@angular/core';
import { generalService } from '../generall.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  courses:any = [];

  constructor(public generalService: generalService, public nav:NavController) {
    this.generalService.get('courses').then(async res => {
      this.courses = res.data;
    })
  }

  back() {
    this.nav.back();
  }

  ngOnInit() {
  }

}
