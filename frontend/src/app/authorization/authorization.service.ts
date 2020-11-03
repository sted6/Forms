import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

  userId$ = new BehaviorSubject<string>('');
  signedIn$ =  new BehaviorSubject<boolean>(false);
  userSecret$ = new BehaviorSubject<string>('');
  userTs$ = new BehaviorSubject<string>('');
  userName$ = new BehaviorSubject<string>(undefined);

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) {
    const secret = window.localStorage.getItem('userSecret');
    const userName = window.localStorage.getItem('userName');
    if (secret) {
      this.signedIn$.next(true);
      this.userSecret$.next(secret);
      this.userName$.next(userName);
    }
   }

  async signup(credentials: SignupCredentials) {
    try {
      return this.http.post<any>('/api/signup', credentials).pipe(
        tap((response) => {
          if (response.description === 'document is not unique.') {
            this.toast.error('Sorry that username is already taken.');
          } else {
            // console.log(response);
            this.toast.success('Account created. Please sign in now.');
          }
        })
      ).toPromise();
    } catch (err) {
      console.error(err);
      this.toast.error('There was a problem signing you up.');
    }
  }

  async signin(credentials: SigninCredentials) {
    try {
      return this.http.post<any>('/api/signin/', credentials).pipe(
        tap((response) => {
          // console.log(response);
          if (response.secret) {
            this.signedIn$.next(true);
            this.userSecret$.next(response.secret);
            this.userId$.next(response.ref['@ref'].id);
            // this.getUser(this.userId$.value);
            window.localStorage.setItem('userSecret', this.userSecret$.value);
            this.toast.success('You have been successfully signed in.');
            this.router.navigateByUrl('/');
            this.userName$.next(credentials.username);
            window.localStorage.setItem('userName', credentials.username);
          } else {
            this.toast.error('Username or password is incorrect.');
          }
        })
      ).toPromise();
    } catch (err) {
      // console.log(err);
      this.toast.error('Sorry there was a problem signing you in.');
    }
  }

  async getUser(userId) {
    return this.http.get<any>('/api/user', userId).toPromise().then( res => {
      // console.log(res);
    });
  }

  async signout() {
    try {
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
      ).toPromise();
    } catch (err) {
      // console.log(err);
      this.toast.error('Sorry there was a problem signing you out.');
    }
  }

  usernameAvailable(username: string) {
    return this.http.post<any>('api/username/', {username: username}).pipe(
      tap( res => {
        // console.log(res);
      }
    )).toPromise();
  }
}
