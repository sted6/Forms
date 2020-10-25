import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  form: Form;
  shippingInfo: FormGroup;
  billingInfo: FormGroup;
  creditCard: FormGroup;

  constructor(private fb: FormBuilder) {
    this.shippingInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      apt: [''],
      city: new FormControl([Validators.required]),
      state: new FormControl([Validators.required]),
      zip: ['', Validators.required]
    });
    this.billingInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      apt: [''],
      city: new FormControl([Validators.required]),
      state: new FormControl([Validators.required]),
      zip: ['', Validators.required]
    });
    this.creditCard = this.fb.group({
      number: '',
      cvc: '',
      name: '',
    }, {validators: Validators.required});
   }

  ngOnInit(): void {
  }

}
