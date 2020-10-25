import { NotFoundComponent } from './views/not-found/not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileDetailsComponent } from './examples/profile-details/profile-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './examples/checkout/checkout.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile-details', component: ProfileDetailsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
