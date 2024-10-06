import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationDetailsPageRoutingModule } from './registration-details-routing.module';

import { RegistrationDetailsPage } from './registration-details.page';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationDetailsPageRoutingModule,
    TranslateModule,
    InputMaskModule
  ],
  declarations: [RegistrationDetailsPage]
})
export class RegistrationDetailsPageModule {}
