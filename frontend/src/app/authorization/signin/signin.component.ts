import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private auth: AuthorizationService) { }

  ngOnInit(): void {
  }

  async signIn() {
    if (!this.userForm.valid) {
      return;
    }
    this.auth.signin(this.userForm.value).then( res => {
      console.log(res);
    });
}

}
