import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController, ModalController, Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  name: any;
  email: any;
  foto: any;
  photo: any;
  loading: Loading;
  public photos: any;
  public base64Image: string;

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
    afAuth: AngularFireAuth,
    public authData: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public events: Events
  ) {

    afAuth.authState.subscribe(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        this.foto = user.photoURL;
      }
    });

  }

  deletePhoto(index) {
    let confirm = this
      .alertCtrl
      .create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this
                .photos
                .splice(index, 1);
              //return true;
            }
          }
        ]
      });
    confirm.present();
  }

  sendModal(){
    let modal = this.modalCtrl.create('EditImagePage', {
      photo: this.foto
    });
    modal.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      allowEdit: true,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this
          .photos
          .push(this.base64Image);
        this
          .photos
          .reverse();
      }, (err) => {
        console.log(err);
      });
  }

  instagramShare() {
    this.socialSharing.shareViaInstagram(`Testing, sharing this from inside an app I'm building right now`, "www/assets/img/hulk.jpg");
  }

  twitterShare() {
    this.socialSharing.shareViaTwitter("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null);
  }

  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.share("Testing, sharing this from inside an app I'm building right now", null, "www/assets/img/hulk.jpg", null);
  }

  whatsappShare() {
    this.socialSharing.shareViaWhatsApp("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null);
  }

  logoutUser() {
    this.authData.logoutUser()
      .then((info) => {
        this.navCtrl.setRoot('TutorialPage');
        console.log(info);
      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

}
