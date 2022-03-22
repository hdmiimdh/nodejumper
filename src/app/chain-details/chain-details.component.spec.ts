import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainDetailsComponent } from './chain-details.component';

describe('ChainDetailsComponent', () => {
  let component: ChainDetailsComponent;
  let fixture: ComponentFixture<ChainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
