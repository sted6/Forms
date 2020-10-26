import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
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

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  constructor(private fb: FormBuilder, private toast: ToastrService) {
    this.valueChanges = this.checkoutForm.valueChanges.pipe((debounce(() => interval(50))))
    .subscribe( changes => {
      this.setBilling();
    });
    this.totalCost = this.cartCost + this.shippingCost;
  }

  onSubmit() {
    alert('Thanks!');
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
      this.toast.error('Some of your information was incorrect. Please check the form for details.')
    } else {
      this.toast.success('Thank you for your business!');
    }
  }
}
