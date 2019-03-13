import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  gaugeValue$: Observable<number>;
  analogStickValue$: Observable<[number, number]>;
  gaugeInterval: number;
  analogStickInterval: number;

  constructor() {}

  ngOnInit() {
    this.gaugeValue$ = Observable.create((observer: Observer<number>) => {
      this.gaugeInterval = window.setInterval(() => {
        observer.next(Math.random() * 100);
      }, 1000);
    });

    this.analogStickValue$ = Observable.create((observer: Observer<[number, number]>) => {
      this.analogStickInterval = window.setInterval(() => {
        const angle = new Date().getTime() / 800;
        const position: [number, number] = [
          Math.round((Math.sin(angle) * 30 + 50) * 100) / 100,
          Math.round((Math.cos(angle) * 40 + 50) * 100) / 100
        ];
        observer.next(position);
      }, 30);
    }).pipe(startWith([50, 50]));
  }

  ngOnDestroy() {
    clearInterval(this.gaugeInterval);
    clearInterval(this.analogStickInterval);
  }
}
