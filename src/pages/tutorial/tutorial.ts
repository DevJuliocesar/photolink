import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  constructor(
    public navCtrl: NavController
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  goToLoginPage(){
    this.navCtrl.push('LoginPage');
  }

  goToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }

}
