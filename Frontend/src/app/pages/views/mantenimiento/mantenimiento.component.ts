import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MantenimientoService } from '../../service/mantenimiento.service';
import { Mantenimiento } from '../../model/mantenimiento';

@Component({
  selector: 'app-mantenimiento',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.scss'
})
export class MantenimientoComponent {
  mantenimientos: Mantenimiento[] = [];
  isDeleteInProgress: boolean = false;
    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  constructor(
    private mantenimientoService: MantenimientoService,
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
    this.getAllMantenimientos();
  }

  getAllMantenimientos() {
    this.mantenimientoService.getMantenimientos().subscribe((data) => {
      this.mantenimientos = data;
    });
  }

  deleteMantenimiento(id: number) {
    this.isDeleteInProgress = true;
    this.mantenimientoService.deleteMantenimiento(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'mantenimiento eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllMantenimientos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el mantenimiento',
        });
      },
    });
  }
 createMantenimiento() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.mantenimientoService.createMantenimiento(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Mantenimiento guardado correctamente',
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
