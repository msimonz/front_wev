import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetallesComponent } from './cliente-detalles.component';

describe('ClienteDetallesComponent', () => {
  let component: ClienteDetallesComponent;
  let fixture: ComponentFixture<ClienteDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDetallesComponent]
    });
    fixture = TestBed.createComponent(ClienteDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
