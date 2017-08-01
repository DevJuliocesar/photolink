import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name : any;
  email: any;
  photo: any;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams,
    private socialSharing: SocialSharing
  ) {
    let info = this.navParams.get('id');
    this.name = info.displayName;
    this.email = info.email;
    this.photo = info.photoURL;
    console.log(info);
  }

  instagramShare(){
    this.socialSharing.shareViaInstagram(`Testing, sharing this from inside an app I'm building right now`, "www/assets/img/hulk.jpg"); 
  }

  twitterShare(){
    this.socialSharing.shareViaTwitter("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null); 
  }

  regularShare(){
    // share(message, subject, file, url)
    this.socialSharing.share("Testing, sharing this from inside an app I'm building right now", null, "www/assets/img/hulk.jpg", null); 
  }
  
  whatsappShare(){
    this.socialSharing.shareViaWhatsApp("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null); 
  }

}
