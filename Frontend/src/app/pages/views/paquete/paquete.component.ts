import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Paquete } from '../../model/paquete';
import { PaqueteService } from '../../service/paquete.service';

@Component({
  selector: 'app-paquete',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.scss'
})
export class PaqueteComponent {
  paquetes: Paquete[] = [];
  isDeleteInProgress: boolean = false;
    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  constructor(
    private paqueteService: PaqueteService,
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
    this.getAllPaquetes();
  }

  getAllPaquetes() {
    this.paqueteService.getPaquetes().subscribe((data) => {
      this.paquetes = data;
    });
  }

  deletePaquete(id: number) {
    this.isDeleteInProgress = true;
    this.paqueteService.deletePaquete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Paquete eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllPaquetes();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el paquete',
        });
      },
    });
  }

}
