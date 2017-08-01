import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Facebook } from '@ionic-native/facebook';
// import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyDiZgXDmQR_2SwNeZn2yS__OAWxLxLxvhQ",
    authDomain: "photolink-c06c8.firebaseapp.com",
    databaseURL: "https://photolink-c06c8.firebaseio.com",
    projectId: "photolink-c06c8",
    storageBucket: "photolink-c06c8.appspot.com",
    messagingSenderId: "140141486876"
};

// firebase.initializeApp({
//     apiKey: "AIzaSyDiZgXDmQR_2SwNeZn2yS__OAWxLxLxvhQ",
//     authDomain: "photolink-c06c8.firebaseapp.com",
//     databaseURL: "https://photolink-c06c8.firebaseio.com",
//     projectId: "photolink-c06c8",
//     storageBucket: "photolink-c06c8.appspot.com",
//     messagingSenderId: "140141486876"
//   });

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
