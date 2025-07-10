import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MantenimientoService } from '../../service/mantenimiento.service';
import { Mantenimiento } from '../../model/mantenimiento';

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
import { EstadoDepartamento } from '../../model/estadoDepartamento';
import { DepartamentoService } from '../../service/departamento.service';
import { EstadoDepartamentoService } from '../../service/estadoDepartamento.service';
import { EstadoMantenimiento } from '../../model/estadoMantenimiento';
import { EstadoMantenimientoService } from '../../service/estadoMantenimiento.service';

@Component({
  selector: 'app-mantenimiento',
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
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.scss'
})
export class MantenimientoComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  mantenimientos: Mantenimiento[] = [];
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  departamentos: Departamento[] = [];
  estadosMantenimiento: EstadoMantenimiento[] = [];

  dropdownItemsDep = [
    { name: '', code: '' }
  ];

  dropdownItemsEstMant = [
    { name: '', code: '' }
  ];
  display: boolean = false;

  constructor(
    private mantenimientoService: MantenimientoService,
    private messageService: MessageService,
    private departamentoService: DepartamentoService,
    private estadosMantenimientoService: EstadoMantenimientoService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,

  ) {
    this.formulario = this.fb.group({
      id: [null],
      descripcion: [null, Validators.required],
      fechaIni: [null, Validators.required],
      fechaFin: [null, Validators.required],
      idDepartamento: [null, Validators.required],
      idEstadoMantenimiento: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllMantenimientos();
    this.getAllDepartamentos();
    this.getAllEstadoMantenimientos();
  }

  getAllMantenimientos() {
    this.mantenimientoService.getMantenimientos().subscribe((data) => {
      this.mantenimientos = data;
    });
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.dropdownItemsDep.length = 0;
      data.forEach(element => {
        this.dropdownItemsDep.push({ name: element.codigo, code: element.id.toString() });
      });
    });
  }

  getAllEstadoMantenimientos() {
    this.estadosMantenimientoService.getEstadoMantenimientos().subscribe((data) => {
      this.dropdownItemsEstMant.length = 0;
      data.forEach(element => {
        this.dropdownItemsEstMant.push({ name: element.estado, code: element.id.toString() });
      });
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
