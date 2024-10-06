import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumsPageRoutingModule } from './premiums-routing.module';

import { PremiumsPage } from './premiums.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumsPageRoutingModule
  ],
  declarations: [PremiumsPage]
})
export class PremiumsPageModule {}
