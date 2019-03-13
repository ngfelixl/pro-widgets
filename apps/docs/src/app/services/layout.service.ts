import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidenavMode$: Observable<string>;
  sidenavOpen$ = new BehaviorSubject<boolean>(true);
  disableClose$ = new BehaviorSubject<boolean>(true);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.sidenavMode$ = this.breakpointObserver.observe('(min-width: 700px)').pipe(
      map(breakpointState => (breakpointState.matches ? 'side' : 'over')),
      tap((mode: string) => {
        switch (mode) {
          case 'over':
            this.sidenavOpen$.next(false);
            this.disableClose$.next(false);
            break;
          default:
            this.sidenavOpen$.next(true);
            this.disableClose$.next(true);
            break;
        }
      })
    );
  }

  openSidenav() {
    this.sidenavOpen$.next(true);
  }

  closeSidenav() {
    this.sidenavOpen$.next(false);
  }
}
