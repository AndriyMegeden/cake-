import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprofilePageRoutingModule } from './editprofile-routing.module';

import { EditprofilePage } from './editprofile.page';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprofilePageRoutingModule,
    TranslateModule,
    InputMaskModule
  ],
  declarations: [EditprofilePage]
})
export class EditprofilePageModule {}
