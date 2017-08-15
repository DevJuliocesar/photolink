import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, LoadingController, Loading, AlertController, ModalController, Events } from 'ionic-angular';
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
  loading: Loading;
  public photos: any = [];

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
    afAuth: AngularFireAuth,
    public authData: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public events: Events,
    public platform: Platform
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
        title: '¿Seguro que quieres eliminar esta foto?',
        message: '',
        buttons: [
          {
            text: 'No'
          }, {
            text: 'Si',
            handler: () => {
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }

  sendModal(id) {
    let confirm = this
      .alertCtrl
      .create({
        title: 'Gestionar Foto',
        message: 'Agregar pegatinas y compartir imagen',
        buttons: [
          {
            text: 'No'
          }, {
            text: 'Si',
            handler: () => {
              let modal = this.modalCtrl.create('EditImagePage', {
                photo: this.photos[id]
              });
              modal.present();
            }
          }
        ]
      });
    confirm.present();

  }

  takePhoto() {
    console.log(this.platform.width());
    console.log(this.platform.height());

    const options: CameraOptions = {
      allowEdit: false,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: this.platform.width(),
      targetHeight: this.platform.height(),
      correctOrientation: true,
    }
    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        let base64Image = "data:image/jpg;base64," + imageData;
        this
          .photos
          .push(base64Image);
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
