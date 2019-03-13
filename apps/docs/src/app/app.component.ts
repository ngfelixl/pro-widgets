import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteDataService } from './services/route-data.service';
import { LayoutService } from './services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subtitle: string;
  subscription: Subscription;

  constructor(
    private titleService: RouteDataService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.subscription = this.titleService.title$.subscribe(
      title => (this.subtitle = title)
    );
  }

  get displayIcon() {
    return this.layoutService.sidenavMode$;
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
