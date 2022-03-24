import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronizationScriptsComponent } from './synchronization-scripts.component';

describe('SynchronizationScriptsComponent', () => {
  let component: SynchronizationScriptsComponent;
  let fixture: ComponentFixture<SynchronizationScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynchronizationScriptsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchronizationScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
