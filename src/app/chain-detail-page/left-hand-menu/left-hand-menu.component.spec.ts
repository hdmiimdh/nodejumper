import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftHandMenuComponent } from './left-hand-menu.component';

describe('LeftHandMenuComponent', () => {
  let component: LeftHandMenuComponent;
  let fixture: ComponentFixture<LeftHandMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftHandMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftHandMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
