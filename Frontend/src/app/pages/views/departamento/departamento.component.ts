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
import { DepartamentoService } from '../../service/departamento.service';


@Component({
  selector: 'app-departamento',
  imports: [ButtonModule, CardModule, RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
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

  idResidenciaSelect: any;

  dropdownItemsRes = [
    { name: '', code: '' }
  ];

  dropdownItemsEstDep = [
    { name: '', code: '' }
  ];
  display: boolean = false;

  constructor(
    private departamentoService: DepartamentoService,
    private residenciaService: ResidenciaService,
    private estadoDepartamentoService: EstadoDepartamentoService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG
  ) {
    this.formulario = this.fb.group({
      id: [null],
      codigo: [null, Validators.required],
      idResidencia: [null, Validators.required],
      idEstadoDepartamento: [null, Validators.required],
      usuario: [null],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllDepartamentos();
    this.getAllResidencias();
    this.getAllTypes();
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
    console.log(this.departamentos.length)
  }

  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.dropdownItemsRes.length = 0;
      data.forEach(element => {
        this.dropdownItemsRes.push({ name: element.nombre, code: element.id.toString() });
      });
    });
  }

  getAllTypes() {
    this.estadoDepartamentoService.getEstadoDepartamentos().subscribe((data) => {
      this.dropdownItemsEstDep.length = 0;
      data.forEach(element => {
        this.dropdownItemsEstDep.push({ name: element.estado, code: element.id.toString() });
      });
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
