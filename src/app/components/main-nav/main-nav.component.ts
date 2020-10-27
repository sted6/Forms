import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
    ])
  ]
})
export class MainNavComponent {
  navOpened = true;
  navState: 'open' | 'closed' = 'open';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  animateToggler() {
    this.navOpened = !this.navOpened;
    if (this.navOpened) {
      this.navState = 'open';
    } else {
      this.navState = 'closed';
    }
  }

}
