import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
