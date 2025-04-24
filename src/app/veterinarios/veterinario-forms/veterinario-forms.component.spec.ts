import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioFormsComponent } from './veterinario-forms.component';

describe('VeterinarioFormsComponent', () => {
  let component: VeterinarioFormsComponent;
  let fixture: ComponentFixture<VeterinarioFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioFormsComponent]
    });
    fixture = TestBed.createComponent(VeterinarioFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
