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
      price: 85,
      term: 1
    },
    {
      name: '6_MONTH',
      sub_id: 'plan3',
      price: 425,
      term: 6
    },
    {
      name: '12_MONTH',
      sub_id: 'plan12',
      price: 765,
      term: 12
    },
  ]

  gems = 0;
  isPro = false;
  products: any = [];
  store: any;

  prodId = "io.ionic.cakes";
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
      // if (environment.production) {
      //   this.store.verbosity = CdvPurchase.LogLevel.ERROR;
      // }
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

    console.log(this.store);

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

  buy(prod: string, callback: (success: boolean) => void) {
    const offer = this.store.get(prod)?.getOffer();
    if (offer) {
      this.store.order(offer).then((result) => {
        if (result.isError) {
          alert('Error Result: ' + JSON.stringify(result, null, 2)); // Pretty-print JSON for better readability
          callback(false);
        } else {
          alert('Success Result: ' + JSON.stringify(result, null, 2));
          callback(true);
        }
      }).catch((error) => {
        // Purchase failed
        console.error('Purchase error:', error);
        alert('Purchase error: ' + JSON.stringify(error, null, 2)); // Show error details
        callback(false);
      });
    } else {
      // If no offer is found for the product, mark it as failed
      callback(false);
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

    // Trigger buy for the selected product
    if (this.selected) {
      this.buy(this.selected, (success: boolean) => {
        if (success) {
          console.log(success);

          // Only proceed if the purchase was successful
          this.request.post('valid_sub/' + time + '/' + this.selected, { token: localStorage.getItem('token') }).then(res => {
            this.getProfile();
            this.selected = '';
          });
        } else {
          // Handle failure (e.g., show an error message)
          this.presentAlert('Purchase Failed', 'The purchase could not be completed. Please try again.');
        }
      });
    }
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
