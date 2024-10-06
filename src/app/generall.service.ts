import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class generalService {

  public url = 'https://api.elvira-cake-app.com/api/';

  errors = [
    { key: 'WRONG_EMAIL', value: 'Неправильний email' },
    { key: 'WRONG_PASSWORD', value: 'Неправильний пароль' },
    { key: 'USER_NOT_FOUND', value: 'Користувач не знайдений' }
  ];

  constructor(public http: HttpClient, private  translate:TranslateService, private loadingCtrl: LoadingController, public alertCtrl: AlertController) { }

  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async showAlert(header: string, message: string) {
    await (await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ["OK"]
    })).present();
  }

  async showError(message: string) {
    await (await this.alertCtrl.create({
      header: this.translate.instant('ERROR'),
      message: message,
      buttons: ["OK"]
    })).present();
  }

  async get_error(key: any) {

    for await (let item of this.errors) {
      if (item.key == key) return item.value;
    }

    return ''
  }

  async showBanner(id: number) {
    this.get('show_banner/' + id).then(res => { console.log('Banner showed: ID ' + id) });
  }

  async clickBanner(id: number) {
    this.get('click_banner/' + id).then(res => { console.log('Banner showed: ID ' + id) });
  }

  async loaderStart() {
    const loading = await this.loadingCtrl.create({
      duration: 3000,
    });

    loading.present();
  }

  async checkAccess(date) {

    let active = JSON.parse(localStorage.getItem('active') as any);
    if (active) {
      return moment(active.active) >= moment() ? true : false;
    } else {
      return false;
    }

    /*
    let transactions = JSON.parse(localStorage.getItem('trans') as any);

    console.log('trans', transactions)

    let check = await transactions.filter(trans => moment(date) >= moment(trans.datetime) && moment(date) <= moment(trans.active));

    return check.length > 0 ? true : false;
    */
  }


  validateLang(data) {
    let lang = localStorage.getItem('language')

    let datatest = [
      {
        text_ru: 'ru',
        text: 'ua',
        datum1: {
          text_ru: 'ru',
          text: 'ua',
          datume2: [
            {
              text_ru: 'ru',
              text: 'ua',
              datum: {
                text_ru: 'ru',
                text: 'ua'
              }
            },
            {
              text_ru: 'ru',
              text: 'ua',
              datum: {
                text_ru: 'ru',
                text: 'ua'
              }
            },
            {
              text_ru: 'ru',
              text: 'ua',
              datume: [
                {
                  text_ru: 'ru',
                  text: 'ua',
                  datum: {
                    text_ru: 'ru',
                    text: 'ua'
                  }
                },
                {
                  text_ru: 'ru',
                  text: 'ua',
                  datum: {
                    text_ru: 'ru',
                    text: 'ua',
                    datume: [
                      {
                        text_ru: 'ru',
                        text: 'ua',
                        datum: {
                          text_ru: 'ru',
                          text: 'ua'
                        }
                      },
                      {
                        text_ru: 'ru',
                        text: 'ua',
                        datum: {
                          text_ru: 'ru',
                          text: 'ua'
                        }
                      },
                      {
                        text_ru: 'ru',
                        text: 'ua',
                        datume: [
                          {
                            text_ru: 'ru',
                            text: 'ua',
                            datum: {
                              text_ru: 'ru',
                              text: 'ua'
                            }
                          },
                          {
                            text_ru: 'ru',
                            text: 'ua',
                            datum: {
                              text_ru: 'ru',
                              text: 'ua'
                            }
                          },
                          {
                            text_ru: 'ru',
                            text: 'ua',
                            datum: {
                              text_ru: 'ru',
                              text: 'ua'
                            }
                          }
                        ]
                      }
                    ]
                  }
                },
                {
                  text_ru: 'ru',
                  text: 'ua',
                  datum: {
                    text_ru: 'ru',
                    text: 'ua'
                  }
                }
              ]
            }
          ]
        }
      }
    ];

    if (lang == 'ru') {
      if (Array.isArray(data)) {
        this.filterArray(data);
      } else {
        this.filterObject(data);
      }
    }

    return data;
  }

  filterObject(obj) {
    for (var key in obj) {
      if (Array.isArray(obj[key])) {
        this.filterArray(obj[key]);
      } else if (typeof obj[key] == 'object') {
        this.filterObject(obj[key]);
      } else {

        if (key.indexOf('_ru')) {
          obj[key.replace("_ru", "")] = obj[key];
        }

        if(key == 'ru'){
          obj['ua'] = obj[key];
        }

      }
    }
  }

  filterArray(array) {
    for (var item of array) {
      if (Array.isArray(item)) {
        this.filterArray(item);
      } else {
        this.filterObject(item);
      }
    }
  }

  get(path: string) {
    //this.loaderStart();
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.url + path;

      let headers: any = { headers: {} };
      if (localStorage.getItem('token')) {
        headers.headers['auth-token'] = localStorage.getItem('token');
        headers.headers['language'] = localStorage.getItem('language');
      }

      this.http.get(url, headers)
        .toPromise()
        .then(async res => {
          this.validateLang(res);
          this.loadingCtrl.dismiss();
          resolve(res);
        }).catch(async err => {
          await this.loadingCtrl.dismiss();

          let error = await this.get_error(err.error);

          if (error != '') {
            await (await this.alertCtrl.create({ header: "Помилка", message: error, buttons: ["OK"] })).present();
          }

          reject(err);
        });
    })
    return promise;
  }

  post(path: any, data: any) {
    this.loaderStart();
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.url + path;

      let headers: any = { headers: {} };
      if (localStorage.getItem('token')) {
        headers.headers['auth-token'] = localStorage.getItem('token');
        headers.headers['language'] = localStorage.getItem('language');
      }

      this.http.post(url, data, headers)
        .toPromise()
        .then(async res => {
          this.loadingCtrl.dismiss();
          resolve(res);
        }).catch(async err => {
          //await this.loadingCtrl.dismiss();

          let error = await this.get_error(err.error);

          if (error != '') {
            await (await this.alertCtrl.create({ header: "Помилка", message: error, buttons: ["OK"] })).present();
          }

          reject(err);
        });
    })
    return promise;
  }

  patch(path: any, data: any) {
    this.loaderStart();
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.url + path;

      let headers: any = { headers: {} };
      if (localStorage.getItem('token')) {
        headers.headers['auth-token'] = localStorage.getItem('token');
        headers.headers['language'] = localStorage.getItem('language');
      }

      this.http.patch(url, data, headers)
        .toPromise()
        .then(async res => {
          this.loadingCtrl.dismiss();
          resolve(res);
        }).catch(async err => {
          alert(JSON.stringify(err));

          // await this.loadingCtrl.dismiss();

          // let error = await this.get_error(err.error);

          // if (error != '') {
          //     await (await this.alertCtrl.create({ header: "Помилка", message: error, buttons: ["OK"] })).present();
          // }

          reject(err);
        });
    })
    return promise;
  }

  delete(path: any) {
    this.loaderStart();
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.url + path;

      let headers: any = { headers: {} };
      if (localStorage.getItem('token')) {
        headers.headers['auth-token'] = localStorage.getItem('token');
        headers.headers['language'] = localStorage.getItem('language');
      }

      this.http.delete(url, headers)
        .toPromise()
        .then(async res => {
          this.loadingCtrl.dismiss();
          resolve(res);
        }).catch(async err => {
          await this.loadingCtrl.dismiss();

          let error = await this.get_error(err.error);

          if (error != '') {
            await (await this.alertCtrl.create({ header: "Помилка", message: error, buttons: ["OK"] })).present();
          }

          reject(err);
        });
    })
    return promise;
  }
}
