import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Residente } from '../../model/residente';
import { ResidenteService } from '../../service/residente.service';

@Component({
  selector: 'app-residente',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './residente.component.html',
  styleUrl: './residente.component.scss'
})
export class ResidenteComponent {
  residentes: Residente[] = [];
  isDeleteInProgress: boolean = false;
    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  constructor(
    private residenteService: ResidenteService,
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
    this.getAllResidentes();
  }

  getAllResidentes() {
    this.residenteService.getResidentes().subscribe((data) => {
      this.residentes = data;
    });
  }

  deleteResidente(id: number) {
    this.isDeleteInProgress = true;
    this.residenteService.deleteResidente(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Residente eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllResidentes();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el residente',
        });
      },
    });
  }
createResidente() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.residenteService.createResidente(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Residente guardado correctamente',
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
