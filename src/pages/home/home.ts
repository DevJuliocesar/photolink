import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    private socialSharing: SocialSharing
  ) {

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
