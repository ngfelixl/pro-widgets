import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gaugeValue$: Observable<number>;
  analogStickValue$: Observable<number[]>;

  constructor() {}

  ngOnInit() {
    this.gaugeValue$ = interval(20).pipe(
      map(() => (Math.sin(new Date().getTime() / 1000) + 1) * 50),
      startWith(0)
    );

    this.analogStickValue$ = interval(600).pipe(
      map(() => [
          Math.random() * 100,
          Math.random() * 100
        ]
      ),
      startWith([50, 50])
    );
  }
}
