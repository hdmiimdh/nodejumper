import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainDetailPageComponent } from './chain-detail-page.component';

describe('ChainDetailsComponent', () => {
  let component: ChainDetailPageComponent;
  let fixture: ComponentFixture<ChainDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChainDetailPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
