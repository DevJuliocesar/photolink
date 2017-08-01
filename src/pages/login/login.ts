import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
// import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data: any = {};
  loginForm: FormGroup;

  displayName;

  constructor(
    public navCtrl: NavController, 
    // private facebook: Facebook,
    public formBuiler: FormBuilder,
    private afAuth: AngularFireAuth, 
    private fb: Facebook, 
    private platform: Platform
    ) {
    this.loginForm = this.formBuiler.group({
      'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    });
    afAuth.authState.subscribe((user: firebase.User) => {
    if (!user) {
      this.displayName = null;
      return;
    }
    this.displayName = user.displayName;      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  saveData( event: Event){
    event.preventDefault();
    console.log(this.loginForm);
    // this.navCtrl.setRoot('HomePage', { id : {
    //   displayName : "prueba nombre",
    //   email : "correo@correo.coma",
    //   photoURL : "https://pixlr.com/assets/images/landing/gallery/5.jpg?1499678471"
    // }});
  }

  loginFacebook(){

    // this.facebook.login(['email']).then((loginResponse) =>{
    //   let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
    //   firebase.auth().signInWithCredential(credential).then((info)=>{
    //     this.navCtrl.setRoot('HomePage', { id : info });
    //     alert(JSON.stringify(info));
    //   })
    // })

    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
