import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@docs/app/services/layout.service';

import { widgets } from '@docs/app/widgets/data/widgets/index';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {
  widgets: { id: string; name: string }[];

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.widgets = Object.entries(widgets).map(entry => ({
      id: entry[0],
      name: entry[1].name
    }));
  }

  closeSidenav() {
    this.layoutService.closeSidenav();
  }
}
