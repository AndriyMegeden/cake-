import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

@Component({
  selector: 'app-premiums',
  templateUrl: './premiums.page.html',
  styleUrls: ['./premiums.page.scss'],
})
export class PremiumsPage implements OnInit {

  constructor(public nav: NavController,
    private store: InAppPurchase2) {

    this.getProducts();
  }

  getProducts() {

    this.store.verbosity = this.store.DEBUG;
    this.store.register({
      id: "io.ionic.cake.sub1",
      type: this.store.PAID_SUBSCRIPTION,
    });

    this.store.when("my_product_id").registered((product: IAPProduct) => {
      alert('Registered: ' + JSON.stringify(product));
    });


    // Run some code only when the store is ready to be used
    this.store.ready(() => {
      alert('Store is ready');
      alert('Products: ' + JSON.stringify(this.store.products));
      alert(JSON.stringify(this.store.get("my_product_id")));
    });

    this.store.refresh();

  }

  buy(){
    this.store.order("io.ionic.cake.sub1");
  }

  back() {
    this.nav.back();
  }

  ngOnInit() {
  }

}
