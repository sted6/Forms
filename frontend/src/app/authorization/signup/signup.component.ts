import { UniqueUsername } from './../validators/unique-username';
import { MatchPassword } from './../validators/match-password';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('',  [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl(''),
    passwordConf: new FormControl('')
  },
  {
    validators: [this.matchPassword.validate] // this.uniqueUsername.validateForm <- add to list when its working
  });

  constructor(private auth: AuthorizationService,
              private router: Router,
              private matchPassword: MatchPassword,
              private uniqueUsername: UniqueUsername) { }

  ngOnInit(): void {
    if (this.auth.signedIn$.value) {
      this.router.navigateByUrl('/');
    }
    const sub = this.userForm.valueChanges.subscribe( changes => {
      console.log(this.userForm.controls.passwordConf.errors);
    });
  }

  async signUp() {
    if (!this.userForm.valid) {
      this.userForm.reset();
      return;
    }
    this.auth.signup(this.userForm.value).then( response => {
      if (response.description !== 'document is not unique.') {
        this.router.navigateByUrl('/signin');
      } else {
        this.userForm.reset();
      }
    });
}

}
