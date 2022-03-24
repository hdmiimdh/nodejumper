import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainCardComponent } from './chain-card.component';

describe('ChainCardComponent', () => {
  let component: ChainCardComponent;
  let fixture: ComponentFixture<ChainCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChainCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
