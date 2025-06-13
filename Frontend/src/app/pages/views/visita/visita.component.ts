import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Visita } from '../../model/visita';
import { VisitaService } from '../../service/visita.service';

@Component({
  selector: 'app-visita',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './visita.component.html',
  styleUrl: './visita.component.scss'
})
export class VisitaComponent {
  visitas: Visita[] = [];
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  
  constructor(
    private visitaService: VisitaService,
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
    this.getAllVisitas();
  }

  getAllVisitas() {
    this.visitaService.getVisitas().subscribe((data) => {
      this.visitas = data;
    });
  }

  deleteVisita(id: number) {
    this.isDeleteInProgress = true;
    this.visitaService.deleteVisita(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Visita eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllVisitas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el visita',
        });
      },
    });
  }

    createVisita() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.visitaService.createVisita(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Departamento guardado correctamente',
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
