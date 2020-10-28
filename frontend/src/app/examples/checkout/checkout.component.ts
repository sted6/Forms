import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { STATES } from 'src/data/states.data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnDestroy{
  checkoutForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(/[0-9]+/)])
    ],
    shipping: ['free', Validators.required],
    companyB: null,
    firstNameB: [null, Validators.required],
    lastNameB: [null, Validators.required],
    addressB: [null, Validators.required],
    address2B: null,
    cityB: [null, Validators.required],
    stateB: [null, Validators.required],
    postalCodeB: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(/[0-9]+/)])
    ],
    ccNumber: [null,  Validators.compose([
      Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern(/[0-9]+/)])
    ],
    ccName: [null, Validators.required],
    ccCVV: [null,  Validators.compose([
      Validators.required, Validators.minLength(3), Validators.maxLength(5), Validators.pattern(/[0-9]+/)])
    ],
  });

  hasUnitNumber = false;
  hasUnitNumberB = false;
  sameBilling = true;
  valueChanges;
  shippingCost = 0;
  cartCost = 42.42;
  totalCost: number;

  states = STATES;

  constructor(private fb: FormBuilder, private toast: ToastrService) {
    this.valueChanges = this.checkoutForm.valueChanges.pipe((debounce(() => interval(50))))
    .subscribe( changes => {
      this.setBilling();
    });
    this.totalCost = this.cartCost + this.shippingCost;
  }

  ngOnDestroy() {
    this.valueChanges.unsubscribe();
  }

  toggleBilling() {
    this.sameBilling = !this.sameBilling;
    this.setBilling();

  }

  setBilling() {
    if (this.sameBilling) {
      this.checkoutForm.controls.companyB.setValue(this.checkoutForm.controls.company.value);
      this.checkoutForm.controls.firstNameB.setValue(this.checkoutForm.controls.firstName.value);
      this.checkoutForm.controls.lastNameB.setValue(this.checkoutForm.controls.lastName.value);
      this.checkoutForm.controls.addressB.setValue(this.checkoutForm.controls.address.value);
      this.checkoutForm.controls.address2B.setValue(this.checkoutForm.controls.address2.value);
      this.checkoutForm.controls.cityB.setValue(this.checkoutForm.controls.city.value);
      this.checkoutForm.controls.stateB.setValue(this.checkoutForm.controls.state.value);
      this.checkoutForm.controls.postalCodeB.setValue(this.checkoutForm.controls.postalCode.value);
    }
  }

  toggleHasUnitNumber() {
    this.hasUnitNumber = !this.hasUnitNumber;
    if (this.sameBilling) {
      this.hasUnitNumberB = this.hasUnitNumber;
    }
  }

  setShippingCost() {
    if (this.checkoutForm.controls.shipping.value === 'free') {
      this.shippingCost = 0;
    }
    if (this.checkoutForm.controls.shipping.value === 'priority') {
      this.shippingCost = 9.99;
    }
    if (this.checkoutForm.controls.shipping.value === 'twoday') {
      this.shippingCost = 19.99;
    }
    if (this.checkoutForm.controls.shipping.value === 'nextday') {
      this.shippingCost = 29.99;
    }
    this.totalCost = this.cartCost + this.shippingCost;
  }

  submit() {
    if (!this.checkoutForm.valid) {
      this.toast.error('Some of your information was incorrect. Please check the form for details.');
    } else {
      this.toast.success('Form submitted. Check the console for details.');
      console.log(this.checkoutForm.value);
    }
  }
}
