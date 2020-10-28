import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  signedIn$ =  new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupCredentials>('/api/signup', credentials).pipe(
      tap((response) => {
        this.username = response.username;
        this.signedIn$.next(true);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<any>('/api/signin/', credentials).pipe(
      tap((response) => {
        this.username = response.username;
        this.signedIn$.next(true);
      })
    ).toPromise();
  }

  signout() {
    return this.http.post<any>('/api/signout/', {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    ).toPromise();
  }
}
