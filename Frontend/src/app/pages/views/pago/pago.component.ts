import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Pago } from '../../model/pago';
import { PagoService } from '../../service/pago.service';

@Component({
  selector: 'app-pago',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {
  pagos: Pago[] = [];
  isDeleteInProgress: boolean = false;
    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  constructor(
    private pagoService: PagoService,
    private messageService: MessageService,
        private fb: FormBuilder,
    private router: Router

  ) {
    this.formulario = this.fb.group({
      id: [null],
      codigo: ['', Validators.required],
      idResidencia: ['', Validators.required],
      idEstadoDepartamento: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllPagos();
  }

  getAllPagos() {
    this.pagoService.getPagos().subscribe((data) => {
      this.pagos = data;
    });
  }

  deletePago(id: number) {
    this.isDeleteInProgress = true;
    this.pagoService.deletePago(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Pago eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllPagos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el pago',
        });
      },
    });
  }
 createPago() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.pagoService.createPago(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Pago guardado correctamente',
        });
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente',
        });
      }
    })
  }
}
