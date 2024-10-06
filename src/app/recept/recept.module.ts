import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceptPageRoutingModule } from './recept-routing.module';

import { ReceptPage } from './recept.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceptPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReceptPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceptPageModule {}
