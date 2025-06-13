import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Incidencia } from '../../model/incidencia';
import { IncidenciaService } from '../../service/incidencia.service';

@Component({
  selector: 'app-incidencia',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.scss'
})
export class IncidenciaComponent {
  incidencias: Incidencia[] = [];
  isDeleteInProgress: boolean = false;
    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  constructor(
    private incidenciaService: IncidenciaService,
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
    this.getAllIncidencias();
  }

  getAllIncidencias() {
    this.incidenciaService.getIncidencias().subscribe((data) => {
      this.incidencias = data;
    });
  }

  deleteIncidencia(id: number) {
    this.isDeleteInProgress = true;
    this.incidenciaService.deleteIncidencia(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Incidencia eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllIncidencias();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el incidencia',
        });
      },
    });
  }
 createIncidencia() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.incidenciaService.createIncidencia(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Incidencia guardada correctamente',
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
