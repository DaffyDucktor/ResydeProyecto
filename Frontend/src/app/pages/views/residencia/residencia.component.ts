import { Component, Input, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ResidenciaService } from '../../service/residencia.service';
import { Residencia } from '../../model/residencia';
import { TipoResidenciaService } from '../../service/tipoResidencia.service';

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
import { TipoResidencia } from '../../model/tipoResidencia';

@Component({
  selector: 'app-residencia',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
  templateUrl: './residencia.component.html',
  styleUrl: './residencia.component.scss'
})
export class ResidenciaComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  residencias: Residencia[] = [];
  isDeleteInProgress: boolean = false;
  tiposResidencia: TipoResidencia[] = [];
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  dropdownItems = [
        { name: '', code: '' }
    ];
  display: boolean = false;

  constructor(
    private residenciaService: ResidenciaService,
    private tipoResidenciaService: TipoResidenciaService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG
  ) {
    this.formulario = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      nDepartamento: [null, Validators.required],
      nEdificio: [null, Validators.required],
      idTipoResidencia: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);

    this.getAllResidencias();
    this.getTiposResidencia();
  }

  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.residencias = data;
    });
  }

  getTiposResidencia() {
    this.tipoResidenciaService.getTipoResidencia().subscribe((data) => {
      this.dropdownItems.length = 0;
      data.forEach(element => {
        this.dropdownItems.push({ name: element.codigo, code: element.id.toString() });
      });
    });
  }
  
  deleteResidencia(id: number) {
    this.isDeleteInProgress = true;
    this.residenciaService.deleteResidencia(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Residencia eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllResidencias();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el residencia',
        });
      },
    });
  }

  openAddForm(): void {
    this.dialog.open(this.dialogTemplate);
  }

  submitForm() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    console.log(JSON.stringify(this.formulario.value))
    this.isSaveInProgress = true;
    this.residenciaService.createResidencia(this.formulario.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Libro guardado correctamente',
          });
          this.isSaveInProgress = false;
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.isSaveInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Revise los campos e intente nuevamente',
          });
        },
      });
  }

  open() {
    this.display = true;
  }

  close() {
    this.display = false;
  }
}
