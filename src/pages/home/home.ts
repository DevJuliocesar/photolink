import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController, Loading, AlertController, ModalController, Events, ActionSheetController } from 'ionic-angular';
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
    private photoLibrary: PhotoLibrary,
    public actionSheetCtrl: ActionSheetController
  ) {

    let agregarImage = this.navParams.get('foto')
    if (agregarImage) {
      this.photos.push(agregarImage);
    }

    afAuth.authState.subscribe(user => {
      console.log(user);
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
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Gestionar Foto',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deletePhoto(id);
          }
        }, {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            this.socialSharing.share("Mira lo que hice con PhotoLink, que esperas vos?", null, this.photos[id], null);
          }
        }, {
          text: 'Editar',
          icon: 'brush',
          handler: () => {
            let modal = this.modalCtrl.create('EditImagePage', {
              photo: this.photos[id]
            });
            modal.present();
          }
        }, {
          text: 'Guardar',
          icon: 'archive',
          handler: () => {
            this.photoLibrary.requestAuthorization().then(() => {
              this.photoLibrary.saveImage(this.photos[id], 'photoLink');
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

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
    this.socialSharing.shareViaInstagram(`PhotoLink la app de tu región`, "www/assets/icon/photolink.png");
  }

  twitterShare() {
    this.socialSharing.shareViaTwitter("PhotoLink la app de tu región", "www/assets/icon/photolink.png", null);
  }

  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.share("PhotoLink la app de tu región", null, "www/assets/icon/photolink.png", null);
  }

  whatsappShare() {
    this.socialSharing.shareViaWhatsApp("PhotoLink la app de tu región", "www/assets/icon/photolink.png", null);
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
