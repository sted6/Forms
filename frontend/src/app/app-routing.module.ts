import { SigninComponent } from './authorization/signin/signin.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileDetailsComponent } from './examples/profile-details/profile-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './examples/checkout/checkout.component';
import { AuthGuard } from './authorization/auth.guard';
import { SignupComponent } from './authorization/signup/signup.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile-details', canActivate: [AuthGuard], component: ProfileDetailsComponent },
  { path: 'assets/files/', canActivate: [AuthGuard], redirectTo: 'signin'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
