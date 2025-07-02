import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Recibo } from '../../model/recibo';
import { ReciboService } from '../../service/recibo.service';

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
import { EstadoRecibo } from '../../model/estadoRecibo';
import { DepartamentoService } from '../../service/departamento.service';
import { EstadoReciboService } from '../../service/estadoRecibo.service';

@Component({
  selector: 'app-recibo',
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
  templateUrl: './recibo.component.html',
  styleUrl: './recibo.component.scss'
})
export class ReciboComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  recibos: Recibo[] = [];
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;
  departamentos: Departamento[] = [];
  estadosRecibo: EstadoRecibo[] = [];


  dropdownItemsYear = [
    { name: '2024', code: '2024' },
    { name: '2025', code: '2025' },
    { name: '2026', code: '2026' },
    { name: '2027', code: '2027' },
  ];
  dropdownItemsMonth = [
    { name: 'Enero', code: '01' },
    { name: 'Febrero', code: '02' },
    { name: 'Marzo', code: '03' },
    { name: 'Abril', code: '04' },
    { name: 'Mayo', code: '05' },
    { name: 'Junio', code: '06' },
    { name: 'Julio', code: '07' },
    { name: 'Agosto', code: '08' },
    { name: 'Setiembre', code: '09' },
    { name: 'Octubre', code: '10' },
    { name: 'Noviembre', code: '11' },
    { name: 'Diciembre', code: '12' },
  ];
  dropdownItemsDep = [
    { name: '', code: '' }
  ];
  dropdownItemsEstRec = [
    { name: '', code: '' }
  ];
  display: boolean = false;

  constructor(
    private reciboService: ReciboService,
    private departamentoService: DepartamentoService,
    private estadoReciboService: EstadoReciboService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.formulario = this.fb.group({
      id: [null],
      codigo: ['', Validators.required],
      idResidencia: ['', Validators.required],
      idEstadoDepartamento: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllRecibos();
  }

  getAllRecibos() {
    this.reciboService.getRecibos().subscribe((data) => {
      this.recibos = data;
    });
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.dropdownItemsEstRec.length = 0;
      data.forEach(element => {
        this.dropdownItemsEstRec.push({ name: element.codigo, code: element.id.toString() });
      });
      this.departamentos = data;
    });
  }

  getAllEstadoRecibo() {
    this.estadoReciboService.getEstadoRecibo().subscribe((data) => {
      this.dropdownItemsEstRec.length = 0;
      data.forEach(element => {
        this.dropdownItemsEstRec.push({ name: element.estado, code: element.id.toString() });
      });
      this.estadosRecibo = data;
    });
  }

  deleteRecibo(id: number) {
    this.isDeleteInProgress = true;
    this.reciboService.deleteRecibo(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Recibo eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllRecibos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el recibo',
        });
      },
    });
  }
  createRecibo() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.reciboService.createRecibo(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Recibo guardado correctamente',
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

  submitForm() {

  }

  openAddForm(): void {
    this.dialog.open(this.dialogTemplate);
  }

  open() {
    this.display = true;
  }

  close() {
    this.display = false;
  }
}
