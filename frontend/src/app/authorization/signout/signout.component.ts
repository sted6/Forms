import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.signout().then(() => {
      this.router.navigateByUrl('/signin');
    });
  }
}
