import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  data_host: any = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.data_host = [];
    this.start = 0;
    this.load_host();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
      this.load_host().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  load_host() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };

      this.postPvdr.postData(body, 'action.php').subscribe((data) => {
        for (let host of data.result) {
          this.data_host.push(host);
        }
        resolve(true);
      });
    });
  }
}
