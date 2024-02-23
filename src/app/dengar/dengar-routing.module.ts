import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DengarPage } from './dengar.page';

const routes: Routes = [
  {
    path: '',
    component: DengarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DengarPageRoutingModule {}
