import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAPProduct, InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { NavController } from '@ionic/angular';
import { Platform, AlertController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';


import "cordova-plugin-purchase/www/store"
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { generalService } from '../generall.service';

const PRODUCT_PRO_KEY = 'devpro';
const PRODUCT_PRO_KEY3 = 'plan3';
const PRODUCT_PRO_KEY12 = 'plan12';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {

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

  gems = 0;
  isPro = false;
  products: any = [];
  store: any;

  prodId = "io.ionic.cakes.sub2";
  product: any;
  buyStatus = false;

  active = false;

  selected = '';
  active_info: any = {};

  constructor(public request: generalService, public nav: NavController, private plt: Platform, private alertController: AlertController, private ref: ChangeDetectorRef) {

    this.getProfile();

    if (this.active_info) {
      if (moment(this.active_info.active) >= moment()) {
        this.active = true
      }
    }

    if (Capacitor.isNativePlatform()) {
      this.store = CdvPurchase.store;
      this.store.verbosity = CdvPurchase.LogLevel.DEBUG;
      if (environment.production) {
        this.store.verbosity = CdvPurchase.LogLevel.ERROR;
      }
      this.store.error((err: unknown) => {
        console.error('Store Error ' + JSON.stringify(err));
      });
      this.registerProducts();
      this.registerListeners();
      this.setupVerification();
      this.store.initialize().then(() => {
        this.store.update().then(() => {
          this.store.restorePurchases();
        });
      });
    }
  }

  registerProducts() {

    this.store.register({
      id: PRODUCT_PRO_KEY,
      type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
      platform: CdvPurchase.Platform.GOOGLE_PLAY
    });

    this.store.register({
      id: PRODUCT_PRO_KEY3,
      type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
      platform: CdvPurchase.Platform.GOOGLE_PLAY
    });

    this.store.register({
      id: PRODUCT_PRO_KEY12,
      type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
      platform: CdvPurchase.Platform.GOOGLE_PLAY
    });
  }

  registerListeners() {
    this.store.when().approved((transaction) => {
      transaction.verify();
    })
  }

  setupVerification() {
    this.store.when().verified((receipt) => {

      let time = receipt.sourceReceipt.transactions[0].nativePurchase.purchaseTime;
      let id = receipt.sourceReceipt.transactions[0].products[0].id;

      this.request.get('valid_sub/' + time + '/' + id + '/' + localStorage.getItem('token')).then(res => {
        alert('validated')
      });

      alert(JSON.stringify(receipt.sourceReceipt.transactions[0].products[0].id)); //

      alert('bued ' + JSON.stringify(receipt));

      if (receipt.id == PRODUCT_PRO_KEY) {
        alert('bued sub')
      }

      receipt.finish();
    })
  }

  buy(prod) {
    const offer = this.store.get(prod)?.getOffer();
    if (offer) {
      this.store.order(offer).then(() => {
        //Purchase in progress
      }, (e: unknown) => {
        //Purchase error
      });
    }
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }



  back() {
    this.nav.back();
  }

  ngOnInit() {
  }

  check_buyed() {
    let time = moment().unix() + '000';

    this.request.post('valid_sub/' + time + '/' + this.selected, { token: localStorage.getItem('token') }).then(res => {
      this.getProfile();
      this.selected = '';
    });
  }

  getProfile() {

    this.request.post('profile', { token: localStorage.getItem('token') }).then(res => {
      localStorage.setItem('profile', JSON.stringify(res.data.user));

      this.request.post('current_subscription', { id: res.data.user.id }).then(res1 => {
        this.active_info = res1.data;
        localStorage.setItem('active', JSON.stringify(this.active_info));


        if (moment(this.active_info.active) >= moment()) {
          this.active = true
        } else {
          this.active = false;
        }

      }, err => {
        localStorage.removeItem('active')
      });
    });
  }

}
