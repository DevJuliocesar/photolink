import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data: any = {};
  loginForm: FormGroup;
  loading:Loading;

  constructor(
    public navCtrl: NavController, 
    public authData: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuiler: FormBuilder,
    ) {
    this.loginForm = this.formBuiler.group({
      'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot('HomePage');
      }, error => {
        this.loading.dismiss().then( () => {
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

  loginFacebook(){

    this.authData.loginFacebook()
      .then( (info)=>{
         this.navCtrl.setRoot('HomePage');
         console.log(info);
       }, error => {
        this.loading.dismiss().then( () => {
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

  loginGmail() {
    this.authData.loginGmail()
      .then( (info)=>{
         this.navCtrl.setRoot('HomePage');
         console.log(info);
       }, error => {
        this.loading.dismiss().then( () => {
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
