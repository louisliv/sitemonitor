import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentChartComponent } from './percent-chart.component';

describe('PercentChartComponent', () => {
  let component: PercentChartComponent;
  let fixture: ComponentFixture<PercentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
