import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceTrackerComponent } from './space-tracker.component';
import { By } from '@angular/platform-browser';

describe('SpaceTrackerComponent', () => {
  let component: SpaceTrackerComponent;
  let fixture: ComponentFixture<SpaceTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceTrackerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should contain an canvas element', () => {
    const canvas = fixture.debugElement.query(By.css('canvas'));

    expect(canvas).toBeTruthy();
  });
});
