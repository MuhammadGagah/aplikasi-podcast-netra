import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private navCtrl: NavController) {}

  ionViewWillEnter() {
    // Menampilkan tab pada halaman ini
    (document.querySelector('ion-tab-bar') as HTMLElement).style.display =
      'flex';
  }

  lanjutkan() {
    this.navCtrl.navigateForward('/tabs/tab2');
  }
}
