import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthorizationService, private router: Router, private toast: ToastrService){}

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('userSecret');
    const signedIn = this.authService.signedIn$.value;
    if (token && signedIn) {
      return true;
    } else {
      this.router.navigateByUrl('signin');
      this.toast.warning('You must be logged in to view that page.');
      return false;
    }
  }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.signedIn$.pipe(
  //     skipWhile(value => value === null),
  //     take(1),
  //     tap((authenticated) => {
  //       if (!authenticated) {
  //         this.router.navigateByUrl('/signin');
  //       }
  //     })
  //   );
  // }
}
