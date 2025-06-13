import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


//primeng
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

import { MessageService } from 'primeng/api';
import { DepartamentoService } from '../../service/departamento.service';
import { Departamento } from '../../model/departamento';

@Component({
  selector: 'app-departamento',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.scss',
})
export class DepartamentoComponent {
  departamentos: Departamento[] = [];
  isDeleteInProgress: boolean = false;

  formulario!: FormGroup;
  isSaveInProgress: boolean = false;
  respuestaData: any;
  objRespuesta: any;
  respuestaPrincipalService: any;
  idPadron: any;

  constructor(
    private departamentoService: DepartamentoService,
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
    this.getAllDepartamentos();
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  deleteDepartamento(id: number) {
    this.isDeleteInProgress = true;
    this.departamentoService.deleteDepartamento(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Departamento eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllDepartamentos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el departamento',
        });
      },
    });
  }

  createDepartamento() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.departamentoService.createDepartamento(this.formulario.value).subscribe({
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
