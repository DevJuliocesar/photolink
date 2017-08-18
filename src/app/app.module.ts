import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase'; 

import { AuthProvider } from '../providers/auth/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyDiZgXDmQR_2SwNeZn2yS__OAWxLxLxvhQ",
    authDomain: "photolink-c06c8.firebaseapp.com",
    databaseURL: "https://photolink-c06c8.firebaseio.com",
    projectId: "photolink-c06c8",
    storageBucket: "photolink-c06c8.appspot.com",
    messagingSenderId: "140141486876"
};

firebase.initializeApp(firebaseConfig);

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
    GooglePlus,
    Facebook,
    Camera,
    PhotoLibrary,
    AuthProvider
  ]
})
export class AppModule {}
