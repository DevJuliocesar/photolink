import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyDiZgXDmQR_2SwNeZn2yS__OAWxLxLxvhQ",
    authDomain: "photolink-c06c8.firebaseapp.com",
    databaseURL: "https://photolink-c06c8.firebaseio.com",
    projectId: "photolink-c06c8",
    storageBucket: "photolink-c06c8.appspot.com",
    messagingSenderId: "140141486876"
  });

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing,
    Facebook
  ]
})
export class AppModule {}
