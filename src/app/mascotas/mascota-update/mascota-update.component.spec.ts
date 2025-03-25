import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaUpdateComponent } from './mascota-update.component';

describe('MascotaUpdateComponent', () => {
  let component: MascotaUpdateComponent;
  let fixture: ComponentFixture<MascotaUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotaUpdateComponent]
    });
    fixture = TestBed.createComponent(MascotaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
