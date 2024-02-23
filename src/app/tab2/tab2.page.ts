import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  nama: string = '';
  nohp: string = '';
  jenis_kelamin: string = '';
  tgl_lahir: string = '';
  pekerjaan: string = '';
  hobi: string = '';
  biografi: string = '';
  judul_podcast: string = '';
  deskripsi_podcast: string = '';
  segmen_podcast: string = '';
  segmen_baru: string = '';
  url_file: string = '';
  status: string = 'pending';
  showTextBoxFlag: boolean = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider
  ) {}

  ngOnInit() {}

  showTextBox() {
    // Jika pengguna memilih "Buat Segmen Baru", tampilkan input teks
    this.showTextBoxFlag = this.segmen_podcast === 'Buat Segmen Baru';
    if (!this.showTextBoxFlag) {
      this.segmen_baru = ''; // Reset nilai segmen_baru jika tidak tampil
    } else {
      // Jika tampil, set segmen_podcast ke nilai segmen_baru
      this.segmen_podcast = this.segmen_baru;
    }
  }

  async addForm() {
    if (this.nama == '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus di isi',
        duration: 2000,
      });
      toast.present();
    } else if (this.nohp == '') {
      const toast = await this.toastController.create({
        message: 'No HP/WA harus di isi',
        duration: 2000,
      });
      toast.present();
    } else if (this.jenis_kelamin == '') {
      const toast = await this.toastController.create({
        message: 'Ups, jenis kelamin harus dipilih',
        duration: 2000,
      });
      toast.present();
    } else if (this.judul_podcast == '') {
      const toast = await this.toastController.create({
        message: 'Judul episode podcast tidak boleh kosong',
        duration: 2000,
      });
      toast.present();
    } else if (this.deskripsi_podcast == '') {
      const toast = await this.toastController.create({
        message: 'Isi dulu deskripsi episode podcastnya ya!',
        duration: 2000,
      });
      toast.present();
    } else if (this.segmen_podcast == '') {
      const toast = await this.toastController.create({
        message: 'Tentukan segmen podcast terlebih dahulu ya!',
        duration: 2000,
      });
      toast.present();
    } else if (this.url_file == '') {
      const toast = await this.toastController.create({
        message: 'URL file harus disertakan!',
        duration: 2000,
      });
      toast.present();
    } else {
      let body = {
        nama: this.nama,
        nohp: this.nohp,
        jenis_kelamin: this.jenis_kelamin,
        tgl_lahir: this.tgl_lahir,
        pekerjaan: this.pekerjaan,
        hobi: this.hobi,
        biografi: this.biografi,
        judul_podcast: this.judul_podcast,
        deskripsi_podcast: this.deskripsi_podcast,
        segmen_podcast: this.segmen_podcast,
        url_file: this.url_file,
        status: this.status,
        aksi: 'add_form',
      };
      this.postPvdr.postData(body, 'action.php').subscribe(async (data) => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/tab3']);
          const toast = await this.toastController.create({
            message:
              'Selamat! Pendaftaran formulir sukses, tunggu ditinjau oleh admin.',
            duration: 2000,
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000,
          });
        }
      });
    }
  }
}
