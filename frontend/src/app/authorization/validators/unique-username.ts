import { AuthorizationService } from './../authorization.service';
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, FormGroup } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthorizationService) {}

    validate = async (control: FormControl) => {
      // console.log(control.value);
      return this.authService.usernameAvailable(control.value).then( res => {
        if (res) {
          // console.log(res);
          if (res.message === 'username available') {
            return null;
          }
          if (res.message === 'username unavailable') {
            return { nonUniqueUsername: true };
          }
        }
      }).catch( err => {
        // console.log(err.message);
        return null;
      });
   }

   validateForm = async (form: FormGroup) => {
     return this.authService.usernameAvailable(form.controls.username.value).then( res => {
       if (res) {
         form.controls.username.setErrors({nonUniqueUsername: true});
       }
     });
   }
}
