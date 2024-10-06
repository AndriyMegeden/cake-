import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookerPage } from './cooker.page';

const routes: Routes = [
  {
    path: '',
    component: CookerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookerPageRoutingModule {}
