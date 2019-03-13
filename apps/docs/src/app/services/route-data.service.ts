import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService {
  title$: Observable<string>;
  hideSidenav$: Observable<boolean>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.title$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(
        () =>
          this.route.firstChild && this.route.firstChild.snapshot.data.subtitle
      )
    );
    this.hideSidenav$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(
        () =>
          this.route.firstChild &&
          this.route.firstChild.snapshot.data.hideSidenav
      )
    );
  }
}
