import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumsPage } from './premiums.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumsPageRoutingModule {}
