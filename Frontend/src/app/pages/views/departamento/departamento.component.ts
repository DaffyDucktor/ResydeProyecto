import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Servicios
import { ResidenciaService } from '../../service/residencia.service';
import { EstadoDepartamentoService } from '../../service/estadoDepartamento.service';

//Modelos
import { Departamento } from '../../model/departamento';
import { EstadoDepartamento } from '../../model/estadoDepartamento';
import { Residencia } from '../../model/residencia';

//primeng
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

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
import { DepartamentoService } from '../../service/departamento.service';


@Component({
  selector: 'app-departamento',
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
  ],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.scss',
})
export class DepartamentoComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;

  departamentos: Departamento[] = [];
  residencias: Residencia[] = [];
  estadosDepartamento: EstadoDepartamento[] = [];

  isDeleteInProgress: boolean = false;

  formulario!: FormGroup;
  isSaveInProgress: boolean = false;
  respuestaData: any;
  objRespuesta: any;
  respuestaPrincipalService: any;
  idPadron: any;


  constructor(
    private departamentoService: DepartamentoService,
    private residenciaService: ResidenciaService,
    private estadoDepartamentoService: EstadoDepartamentoService,
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
    this.getAllDepartamentos();
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.residencias = data;
    });
  }

  getAllTypes() {
    this.estadoDepartamentoService.getEstadoDepartamentos().subscribe((data) => {
      this.estadosDepartamento = data;
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

  submitForm() {

  }

  openAddForm(): void {
    this.dialog.open(this.dialogTemplate);
  }
}
