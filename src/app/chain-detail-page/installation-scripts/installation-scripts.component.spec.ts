import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationScriptsComponent } from './installation-scripts.component';

describe('InstallationScriptsComponent', () => {
  let component: InstallationScriptsComponent;
  let fixture: ComponentFixture<InstallationScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationScriptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
