import { LayoutService } from './layout.service';
import { skip } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';

class MockBreakpointObserver {
  private state: BehaviorSubject<BreakpointState> = new BehaviorSubject(undefined);

  resize(size: number) {
    this.state.next({ matches: size >= 700 ? true : false, breakpoints: {} });
  }

  observe(): Observable<BreakpointState> {
    return this.state.asObservable().pipe(skip(1));
  }
}

describe('LayoutService', () => {
  let service: LayoutService;
  let breakpointObserver: MockBreakpointObserver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService, { provide: BreakpointObserver, useClass: MockBreakpointObserver }]
    });
    service = TestBed.get(LayoutService);
    breakpointObserver = TestBed.get(BreakpointObserver);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should push a true to sidenavOpen$ observable when running openSidenav', done => {
    service.sidenavOpen$.pipe(skip(1)).subscribe(state => {
      expect(state).toBe(true);
      done();
    });
    service.openSidenav();
  });

  it('should push a false to sidenavOpen$ observable when running closeSidenav', done => {
    service.sidenavOpen$.pipe(skip(1)).subscribe(state => {
      expect(state).toBe(false);
      done();
    });
    service.closeSidenav();
  });

  it('should push sidenavMode "side" when window width >= 700', done => {
    breakpointObserver.resize(400);
    service.sidenavMode$.subscribe(mode => {
      expect(mode).toBe('side');
      done();
    });
    breakpointObserver.resize(701);
  });

  it('should push sidenavMode "over" when window width < 700', done => {
    breakpointObserver.resize(700);
    service.sidenavMode$.subscribe(mode => {
      expect(mode).toBe('over');
      done();
    });
    breakpointObserver.resize(400);
  });
});
