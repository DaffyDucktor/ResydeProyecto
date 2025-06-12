import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenciaComponent } from './residencia.component';

describe('ResidenciaComponent', () => {
  let component: ResidenciaComponent;
  let fixture: ComponentFixture<ResidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
