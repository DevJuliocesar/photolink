import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-image',
  templateUrl: 'edit-image.html',
})
export class EditImagePage {

  openMenu = false;
  sticker: any = '';
  photo: any = ''; 

  items = [
      'assets/img/iconos/sombrero.png',
      'assets/img/iconos/tiple.png',
      'assets/img/iconos/acordeon.png',
      'assets/img/iconos/BicicletaCo.png',
      'assets/img/iconos/patinadorCo.png',
      'assets/img/iconos/pesasCo.png',
      'assets/img/iconos/empanada.png',
      'assets/img/iconos/bandeja-paisa.png',
      'assets/img/iconos/lechona.png',
      'assets/img/iconos/emojiCo.png',
      'assets/img/iconos/pajaroCo.png',
      'assets/img/iconos/superCo.png',
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events
  ) {
    this.photo = this.navParams.get('photo');
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  goToPopup(data) {
    this.sticker = data;
    this.togglePopupMenu();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
