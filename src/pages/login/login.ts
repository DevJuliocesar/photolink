import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook(){

    this.facebook.login(['email']).then((loginResponse) =>{
      let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then((info)=>{
        alert(JSON.stringify(info));
      })
    })

  }
  
  loginFacebook2(){
    let provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
        alert(JSON.stringify(result));
      }).catch(function(error) {
        alert(JSON.stringify(error));
      })
    });
  }

}
