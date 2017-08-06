import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = 'HomePage';
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'TutorialPage';
        authObserver.unsubscribe();
      }
    });

    platform.ready().then(() => {
      if (platform.is('cordova')) {
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }

}

