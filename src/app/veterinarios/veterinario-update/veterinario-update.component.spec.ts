import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioUpdateComponent } from './veterinario-update.component';

describe('VeterinarioUpdateComponent', () => {
  let component: VeterinarioUpdateComponent;
  let fixture: ComponentFixture<VeterinarioUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioUpdateComponent]
    });
    fixture = TestBed.createComponent(VeterinarioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
