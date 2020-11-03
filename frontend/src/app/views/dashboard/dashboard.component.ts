import { AuthorizationService } from './../../authorization/authorization.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sub: Subscription;

  formPreviews = [
    { title: 'Checkout',
      description: 'A simple responsive checkout form that implements angular\'s form builder service and form validation.',
      imageSrc: 'assets/images/checkout_preview_small.jpg',
      tinyImageSrc: 'assets/images/checkout_preview_tiny.jpg',
      imageAlt: 'Checkout Sample Form Screenshot',
      files: 'assets/files/checkout.zip',
      premium: false,
      url: '/checkout'
    },
    { title: 'Detailed Profile',
      description: 'A detailed profile form with advanced features. Please login to view this form.',
      imageSrc: 'assets/images/checkout_preview_small.jpg',
      tinyImageSrc: 'assets/images/checkout_preview_tiny.jpg',
      imageAlt: 'Checkout Sample Form Screenshot',
      files: 'assets/files/checkout.zip',
      premium: true,
      url: '/profile-details'
    },
  ];

  constructor(private auth: AuthorizationService) { }

  ngOnInit(): void {
    this.sub = this.auth.signedIn$.asObservable().subscribe((val) => {
      if (val) {
        this.formPreviews[1].description = 'Okay so it\'s actually just another copy of the checkout form...';
      } else {
        this.formPreviews[1].description = 'A detailed profile form with advanced features. Please login to view this form.';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
