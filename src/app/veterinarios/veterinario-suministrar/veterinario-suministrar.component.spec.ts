import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioSuministrarComponent } from './veterinario-suministrar.component';

describe('VeterinarioSuministrarComponent', () => {
  let component: VeterinarioSuministrarComponent;
  let fixture: ComponentFixture<VeterinarioSuministrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioSuministrarComponent]
    });
    fixture = TestBed.createComponent(VeterinarioSuministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
