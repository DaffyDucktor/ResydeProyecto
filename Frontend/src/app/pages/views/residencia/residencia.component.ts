import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Residencia } from '../../model/residencia';
import { ResidenciaService } from '../../service/residencia.service';

@Component({
  selector: 'app-residencia',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './residencia.component.html',
  styleUrl: './residencia.component.scss'
})
export class ResidenciaComponent {
  residencias: Residencia[] = [];
  isDeleteInProgress: boolean = false;

    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  constructor(
    private residenciaService: ResidenciaService,
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
    this.getAllResidencias();
  }

  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.residencias = data;
    });
  }

  deleteResidencia(id: number) {
    this.isDeleteInProgress = true;
    this.residenciaService.deleteResidencia(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Residencia eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllResidencias();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el residencia',
        });
      },
    });
  }
  createResidencia() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.residenciaService.createResidencia(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Residencia guardada correctamente',
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
