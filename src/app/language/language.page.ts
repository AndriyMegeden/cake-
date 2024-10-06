import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  constructor(public router:Router, public translate:TranslateService) { }

  ngOnInit() {
  }

  setLanguage(language:string){
    this.translate.setDefaultLang(language);
    localStorage.setItem('language', language)
    this.router.navigateByUrl('/cooker')
  }

}
