import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMasivaPagoComponent } from './carga-masiva-pago.component';

describe('CargaMasivaPagoComponent', () => {
  let component: CargaMasivaPagoComponent;
  let fixture: ComponentFixture<CargaMasivaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaMasivaPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaMasivaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
