import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Paquete } from '../../model/paquete';
import { PaqueteService } from '../../service/paquete.service';

//primeng
import { PrimeNG } from 'primeng/config';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
//Material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { Departamento } from '../../model/departamento';
import { EstadoPaquete } from '../../model/estadoPaquete';
import { DepartamentoService } from '../../service/departamento.service';
import { EstadoPaqueteService } from '../../service/estadoPaquete.service';

@Component({
  selector: 'app-paquete',
  imports: [ButtonModule, CardModule, RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // Angular Material
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    //primeng
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    FileUploadModule,
    FluidModule, SelectModule, TextareaModule, DialogModule, DropdownModule
  ],
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.scss'
})
export class PaqueteComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  paquetes: Paquete[] = [];
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  departamentos: Departamento[] = [];
  estadosPaquete: EstadoPaquete[] = [];

  dropdownItemsDep = [
    { name: '', code: '' }
  ];

  dropdownItemsEstPaq = [
    { name: '', code: '' }
  ];
  display: boolean = false;

  constructor(
    private paqueteService: PaqueteService,
    private messageService: MessageService,
    private departamentoService: DepartamentoService,
    private estadoPaqueteService: EstadoPaqueteService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,

  ) {
    this.formulario = this.fb.group({
      id: [null],
      remitente: [null, Validators.required],
      descripcion: [null, Validators.required],
      fecha: [null, Validators.required],
      hora: [null, Validators.required],
      codigo: [null, Validators.required],
      idDepartamento: [null, Validators.required],
      idEstadoPaquete: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllPaquetes();
    this.getAllDepartamentos();
    this.getAllEstados();
  }

  getAllPaquetes() {
    this.paqueteService.getPaquetes().subscribe((data) => {
      this.paquetes = data;
    });
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.dropdownItemsDep.length = 0;
      data.forEach(element => {
        this.dropdownItemsDep.push({ name: element.codigo, code: element.id.toString() });
      });
      this.departamentos = data;
    });
  }

  getAllEstados() {
    this.estadoPaqueteService.getEstadoPaquetes().subscribe((data) => {
      this.dropdownItemsEstPaq.length = 0;
      data.forEach(element => {
        this.dropdownItemsEstPaq.push({ name: element.estado, code: element.id.toString() });
      });
      this.estadosPaquete = data;
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

  submitForm() {

  }

  openAddForm(): void {
    this.dialog.open(this.dialogTemplate);
  }

  open() {
    this.formulario.enable();
    this.formulario.reset();
    this.display = true;
  }

  edit() {
    this.formulario.enable();
    this.display = true;
  }

  view() {
    this.formulario.disable();
    this.display = true;
  }

  close() {
    this.display = false;
  }
}
