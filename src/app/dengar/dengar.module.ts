import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DengarPageRoutingModule } from './dengar-routing.module';

import { DengarPage } from './dengar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DengarPageRoutingModule
  ],
  declarations: [DengarPage]
})
export class DengarPageModule {}
