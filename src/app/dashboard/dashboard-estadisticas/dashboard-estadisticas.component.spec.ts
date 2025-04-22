import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEstadisticasComponent } from './dashboard-estadisticas.component';

describe('DashboardEstadisticasComponent', () => {
  let component: DashboardEstadisticasComponent;
  let fixture: ComponentFixture<DashboardEstadisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEstadisticasComponent]
    });
    fixture = TestBed.createComponent(DashboardEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
