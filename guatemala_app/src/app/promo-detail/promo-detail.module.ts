import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoDetailPageRoutingModule } from './promo-detail-routing.module';

import { PromoDetailPage } from './promo-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromoDetailPageRoutingModule
  ],
  declarations: [PromoDetailPage]
})
export class PromoDetailPageModule {}
