import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyValidators } from '../../validators/validators';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuiler: FormBuilder
  ) {
    this.myForm = this.formBuiler.group({
      'email': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      'name': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'age': ['', [Validators.required, MyValidators.isOld]],
      'passwordGroup': this.formBuiler.group({
        'password': ['',[Validators.required]],
        'confirmPassword': ['', [Validators.required]],
      }, {
        validator: MyValidators.passwordMatcher
      })
    });

    let obj = {
      'email': 'email@gmail.com',
      'age': 19,
      'nickname': 'user'
    }

    this.myForm.patchValue(obj);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  saveData(event: Event){
    event.preventDefault();
    console.log(this.myForm.value);
    console.log(this.myForm.value.age);
    console.log(this.myForm.value.nickname);
    console.log(this.myForm.value.passwordGroup.password);
    console.log(this.myForm.value.passwordGroup.confirmPassword);
  }

  goToHomePage(){
    this.navCtrl.setRoot( 'HomePage' );
  }
}
