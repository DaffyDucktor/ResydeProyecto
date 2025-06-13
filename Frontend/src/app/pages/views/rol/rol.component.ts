import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Rol } from '../../model/rol';
import { RolService } from '../../service/rol.service';

@Component({
  selector: 'app-rol',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent {
  roles: Rol[] = [];
  isDeleteInProgress: boolean = false;

    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  constructor(
    private rolService: RolService,
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
    this.getAllRols();
  }

  getAllRols() {
    this.rolService.getRols().subscribe((data) => {
      this.roles = data;
    });
  }

  deleteRol(id: number) {
    this.isDeleteInProgress = true;
    this.rolService.deleteRol(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Rol eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllRols();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el rol',
        });
      },
    });
  }

  createRol() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.rolService.createRol(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Rol guardado correctamente',
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
