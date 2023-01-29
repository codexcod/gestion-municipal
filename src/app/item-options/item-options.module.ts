import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemOptionsPageRoutingModule } from './item-options-routing.module';

import { ItemOptionsPage } from './item-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemOptionsPageRoutingModule
  ],
  declarations: [ItemOptionsPage]
})
export class ItemOptionsPageModule {}
