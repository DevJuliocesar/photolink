import { FormControl, AbstractControl } from '@angular/forms';

export class MyValidators{

  static isOld(control: FormControl){
    let value = control.value;
    if(value >= 18){
      return null;
    }else{
      return {'isold': true}
    }
  }

  static isValid(control: FormControl){
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);
    if (re){
      return null;
    }
    return {
      "invalidEmail": true
    };
  }

  static passwordMatcher(group: AbstractControl){
    let password = group.get('password').value;
    let confimPassword = group.get('confirmPassword').value;
    if(password === confimPassword){
      return null;
    }else{
      return {'nomatch': true};
    }

  }

}