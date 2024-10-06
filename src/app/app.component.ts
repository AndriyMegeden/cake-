import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { generalService } from './generall.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  language = 'ua';

  constructor(public router: Router, public translate: TranslateService, public request:generalService) {

    if(localStorage.getItem('language')){
      this.translate.setDefaultLang(localStorage.getItem('language') as any);
    }

    if (!localStorage.getItem('token')) {
      if (!localStorage.getItem('language')) {
        this.router.navigateByUrl('/language', { replaceUrl: true })
      } else {
        this.router.navigateByUrl('/cooker', { replaceUrl: true })
      }
    } else {
      this.request.post('my_transactions',{token:localStorage.getItem('token')}).then(res => {
        localStorage.setItem('trans', JSON.stringify(res.data));
      })
    }
  }
}
