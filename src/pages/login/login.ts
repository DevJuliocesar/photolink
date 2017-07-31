import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data: any = {};

  constructor(public navCtrl: NavController, private facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  saveData( event: Event){
    event.preventDefault();
    console.log(this.data);
    // this.navCtrl.setRoot('HomePage', { id : {
    //   displayName : "prueba nombre",
    //   email : "correo@correo.coma",
    //   photoURL : "https://pixlr.com/assets/images/landing/gallery/5.jpg?1499678471"
    // }});
  }

  loginFacebook(){

    this.facebook.login(['email']).then((loginResponse) =>{
      let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then((info)=>{
        this.navCtrl.setRoot('HomePage', { id : info });
        alert(JSON.stringify(info));
      })
    })

  }

}
