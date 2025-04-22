import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioLoginComponent } from './veterinario-login.component';

describe('VeterinarioLoginComponent', () => {
  let component: VeterinarioLoginComponent;
  let fixture: ComponentFixture<VeterinarioLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioLoginComponent]
    });
    fixture = TestBed.createComponent(VeterinarioLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
