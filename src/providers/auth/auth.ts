import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    private fb: Facebook,
    public googleplus: GooglePlus,
    private platform: Platform
  ) { }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  loginFacebook(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }
  loginGmail(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.googleplus.login({
        'webClientId': '140141486876-0f0139vkook3v7elk4gcdpl6f30so3se.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        const gmailCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        return firebase.auth().signInWithCredential(gmailCredential);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

}
