import { async, TestBed } from '@angular/core/testing';
import { ProModule } from './pro.module';

describe('ProModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProModule).toBeDefined();
  });
});
