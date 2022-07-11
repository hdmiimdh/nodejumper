import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowPulseCircleComponent } from './shadow-pulse-circle.component';

describe('ShadowPulseCircleComponent', () => {
  let component: ShadowPulseCircleComponent;
  let fixture: ComponentFixture<ShadowPulseCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadowPulseCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowPulseCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
