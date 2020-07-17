import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoDetailPage } from './promo-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PromoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoDetailPageRoutingModule {}
