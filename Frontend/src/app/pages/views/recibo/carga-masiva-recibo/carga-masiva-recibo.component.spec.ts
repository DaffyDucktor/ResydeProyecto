import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMasivaReciboComponent } from './carga-masiva-recibo.component';

describe('CargaMasivaReciboComponent', () => {
  let component: CargaMasivaReciboComponent;
  let fixture: ComponentFixture<CargaMasivaReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaMasivaReciboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaMasivaReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
