import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutappPageRoutingModule } from './aboutapp-routing.module';

import { AboutappPage } from './aboutapp.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutappPageRoutingModule,
    TranslateModule
  ],
  declarations: [AboutappPage]
})
export class AboutappPageModule {}
