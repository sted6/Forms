import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.signedIn$.value) {
      this.router.navigateByUrl('/');
    }
  }

  async signIn() {
    if (!this.userForm.valid) {
      this.userForm.reset();
      return;
    }
    this.auth.signin(this.userForm.value).then( res => {
      if (res.secret) {
        this.router.navigateByUrl('/');
      }
    });
}

}
