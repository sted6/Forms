import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirm: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  subs;
  username: string;

  userId$ = new BehaviorSubject<string>('');
  signedIn$ =  new BehaviorSubject<boolean>(false);
  userSecret$ = new BehaviorSubject<string>('');
  userTs$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) {
    const secret = window.localStorage.getItem('userSecret');
    if (secret) {
      this.signedIn$.next(true);
      this.userSecret$.next(secret);
    }
   }

  signup(credentials: SignupCredentials) {
    return this.http.post<any>('/api/signup', credentials).pipe(
      tap((response) => {
        if (response.description === 'document is not unique.') {
          this.toast.error('Sorry that username is already taken.');
        } else {
          console.log(response);
          this.toast.success('Account created. Please sign in now.');
        }
      })
    ).toPromise().catch(err => {
      console.error(err);
      this.toast.error('There was a problem signing you up.')
    });
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<any>('/api/signin/', credentials).pipe(
      tap((response) => {
        if (response.secret) {
          this.signedIn$.next(true);
          this.userSecret$.next(response.secret);
          window.localStorage.setItem('userSecret', this.userSecret$.value);
          this.toast.success('You have been successfully signed in.');
          this.router.navigateByUrl('/');
        } else {
          this.toast.error('Username or password is incorrect.');
        }
      })
    ).toPromise().catch(err => {
      console.log(err);
      this.toast.error('Sorry there was a problem signing you in.');
    });
  }

  signout() {
    return this.http.post<any>('/api/signout/', {}).pipe(
      tap((res) => {
        this.signedIn$.next(res);
        if (res) {
          this.toast.error('Sorry there was a problem signing you out.');
        } else {
          window.localStorage.removeItem('userSecret');
          this.toast.success('You have been successfully signed out.');
          this.router.navigateByUrl('/');
        }
      })
    ).toPromise().catch( err => {
      console.log(err);
      this.toast.error('Sorry there was a problem signing you out.');
    });
  }
}
