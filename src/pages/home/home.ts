import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController, Loading, AlertController, ModalController, Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';

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
    public platform: Platform,
    public navParams: NavParams,
    private photoLibrary: PhotoLibrary
  ) {

    let agregarImage = this.navParams.get('foto')
    if (agregarImage) {
      this.photos.push(agregarImage);
    }

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

  sendEdit() {
    this.navCtrl.push('EditImagePage');
  }

  sendModal(id) {
    let confirm = this
      .alertCtrl
      .create({
        title: 'Gestionar Foto',
        message: 'Agregar pegatinas y compartir imagen',
        buttons: [
          {
            text: 'Cancelar'
          }, 
          {
            text: 'Modificar',
            handler: () => {
              let modal = this.modalCtrl.create('EditImagePage', {
                photo: this.photos[id]
              });
              modal.present();
            }
          },
          {
            text: 'Guardar',
            handler: () => {
              this.photoLibrary.requestAuthorization().then(() => {
                console.log('hola');
                this.photoLibrary.saveImage(this.photos[id], 'photoLink');
              });
            }
          },

        ]
      });
    confirm.present();

  }

  takePhoto() {
    let dato = this.platform.height() - 56;
    const options: CameraOptions = {
      allowEdit: false,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 1024,
      correctOrientation: true,
    }
    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        let base64Image = "data:image/png;base64," + imageData;
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
