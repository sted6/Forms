import { MatchPassword } from './../validators/match-password';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    passwordConf: new FormControl()
  },
  {
    validators: [this.matchPassword.validate]
  });

  constructor(private auth: AuthorizationService, private router: Router, private matchPassword: MatchPassword) { }

  ngOnInit(): void {
    if (this.auth.signedIn$.value) {
      this.router.navigateByUrl('/');
    }
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
