import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-image',
  templateUrl: 'edit-image.html',
})
export class EditImagePage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditImagePage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
