import { AuthorizationService } from './../../authorization/authorization.service';
import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [
    trigger('navState', [
      state('closed', style({
        transform: 'rotate(45deg)'
      })),
      state('open', style({
        transform: 'rotate(-135deg)'
      })),
      transition('closed => open', [
        animate('.25s')
      ]),
      transition('open => closed', [
        animate('.25s')
      ]),
    ]),
    trigger('accountMenuState', [
      state('open', style({
        bottom: '-64px',
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        bottom: '300px',
      })),
      transition('closed => open', [
        animate('.25s')
      ]),
      transition('open => closed', [
        animate('.25s')
      ]),
    ])
  ]
})
export class MainNavComponent implements OnDestroy {
  sub: Subscription;
  navOpened = true;
  navState: 'open' | 'closed' = 'open';
  accountMenuOpen = false;
  accountMenuState: 'open' | 'closed' = 'closed';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn$ = this.auth.signedIn$;

  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthorizationService, private router: Router) {
    this.sub = this.router.events.subscribe( events => {
      this.accountMenuOpen = false;
    });
  }

  animateToggler() {
    this.navOpened = !this.navOpened;
    if (this.navOpened) {
      this.navState = 'open';
    } else {
      this.navState = 'closed';
    }
  }

  goToSignin() {
    this.router.navigateByUrl('/signin');
    this.accountMenuOpen = false;
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
    this.accountMenuOpen = false;
  }

  signOut() {
    this.auth.signout();
  }

  openAccountMenu() {
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
