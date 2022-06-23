import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatSheetComponent } from './cheat-sheet.component';

describe('CheatSheetComponent', () => {
  let component: CheatSheetComponent;
  let fixture: ComponentFixture<CheatSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheatSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
