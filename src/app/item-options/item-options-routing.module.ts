import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemOptionsPage } from './item-options.page';

const routes: Routes = [
  {
    path: '',
    component: ItemOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemOptionsPageRoutingModule {}
