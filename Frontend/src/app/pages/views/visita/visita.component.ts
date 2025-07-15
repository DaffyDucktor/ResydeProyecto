import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Servicios
import { DepartamentoService } from '../../service/departamento.service';
import { VisitaService } from '../../service/visita.service';

//Modelos
import { Visita } from '../../model/visita';
import { Departamento } from '../../model/departamento';

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
import { DatePickerModule } from 'primeng/datepicker';

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
import { ResidenciaService } from '../../service/residencia.service';

@Component({
  selector: 'app-visita',
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
    DatePickerModule,
    FluidModule, SelectModule, TextareaModule, DialogModule, DropdownModule

  ],
  templateUrl: './visita.component.html',
  styleUrl: './visita.component.scss'
})
export class VisitaComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  visitas: Visita[] = [];
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;
  departamentos: Departamento[] = [];
  idResidenciaSelect: any;

  dropdownItemsVisible = [
    { name: 'Si', code: '1' },
    { name: 'No', code: '2' }
  ];

  dropdownItemsDep = [
    { name: '', code: '' }
  ];

  dropdownItemsRes = [
    { name: '', code: '' }
  ];
  display: boolean = false;
  editable: boolean = true;


  constructor(
    private departamentoService: DepartamentoService,
    private residenciaService: ResidenciaService,
    private visitaService: VisitaService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG

  ) {
    this.formulario = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      comentario: ['', Validators.required],
      visible: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      idDepartamento: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllResidencias();
  }

  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.dropdownItemsRes.length = 0;
      data.forEach(element => {
        this.dropdownItemsRes.push({ name: element.nombre, code: element.id.toString() });
      });
    });
  }
  getAllVisitas(idResidencia: number) {
    this.visitaService.getVisitasByResidence(idResidencia).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Visitas encontradas',
          });
        } else {
          this.messageService.add({
            severity: 'information',
            summary: 'Aviso',
            detail: 'No hay Visitas creados para esta residencia',
          });
        }
        this.isDeleteInProgress = false;
        this.visitas = data;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo encontrar visitas',
        });
      },
    });
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.dropdownItemsDep.length = 0;
      data.forEach(element => {
        this.dropdownItemsDep.push({ name: element.codigo, code: element.id.toString() });
      })
    });
  }
  deleteVisita(id: number) {
    this.isDeleteInProgress = true;
    this.visitaService.deleteVisita(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Visita eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllVisitas(this.idResidenciaSelect);
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el visita',
        });
      },
    });
  }

  createVisita() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.visitaService.createVisita(this.formulario.value).subscribe({
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
