import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Service
import { ReciboService } from '../../service/recibo.service';
import { ResidenciaService } from '../../service/residencia.service';
import { DepartamentoService } from '../../service/departamento.service';
import { EstadoReciboService } from '../../service/estadoRecibo.service';

//Model
import { Recibo } from '../../model/recibo';
import { Departamento } from '../../model/departamento';
import { EstadoRecibo } from '../../model/estadoRecibo';

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
import { CalendarModule } from 'primeng/calendar';

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

@Component({
  selector: 'app-recibo',
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
    FluidModule, SelectModule, TextareaModule, DialogModule, DropdownModule, CalendarModule
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

  idResidenciaSelect: any;

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

  dropdownItemsRes = [
    { name: '', code: '' }
  ];
  display: boolean = false;
  editable: boolean = true;

  constructor(
    private reciboService: ReciboService,
    private residenciaService: ResidenciaService,
    private departamentoService: DepartamentoService,
    private estadoReciboService: EstadoReciboService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG

  ) {
    this.formulario = this.fb.group({
      id: [""],
      year: ["", Validators.required],
      month: ["", Validators.required],
      particulars: ["", Validators.required],
      total: ["", Validators.required],
      comments: ["", Validators.required],
      idDepartamento: ["", Validators.required],
      idEstadoRecibo: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllResidencias();
    this.getAllEstadoRecibo();
  }
  getResidencia() {
    this.getAllRecibos(this.idResidenciaSelect);
    this.getAllDepartamentos(this.idResidenciaSelect);
  }
  getAllRecibos(idResidencia: number) {
    this.reciboService.getRecibosByResidence(idResidencia).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Incidencias encontradas',
          });
        } else {
          this.messageService.add({
            severity: 'information',
            summary: 'Aviso',
            detail: 'No hay Incidencias creados para esta residencia',
          });
        }
        this.isDeleteInProgress = false;
        this.recibos = data;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo encontrar incidencias',
        });
      },
    });
  }

  getAllDepartamentos(idResidencia: number) {
    this.departamentoService.getDepartamentosByResidence(idResidencia).subscribe((data) => {
      this.dropdownItemsDep.length = 0;
      data.forEach(element => {
        this.dropdownItemsDep.push({ name: element.codigo, code: element.id.toString() });
      });
    });
  }

  getAllEstadoRecibo() {
    this.estadoReciboService.getEstadoRecibo().subscribe((data) => {
      this.dropdownItemsEstRec.length = 0;
      data.forEach(element => {
        this.dropdownItemsEstRec.push({ name: element.estado, code: element.id.toString() });
      });
    });
  }
  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.dropdownItemsRes.length = 0;
      data.forEach(element => {
        this.dropdownItemsRes.push({ name: element.nombre, code: element.id.toString() });
      });
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
        //this.getAllRecibos();
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
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }

    this.isSaveInProgress = true;
    this.reciboService.createRecibo(this.formulario.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Incidencia guardada correctamente',
          });
          this.isSaveInProgress = false;
          this.close();
          this.getAllRecibos(this.idResidenciaSelect);
        },
        error: () => {
          this.isSaveInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Revise los campos e intente nuevamente',
          });
        }
      });
  }

  openAddForm(): void {
    this.dialog.open(this.dialogTemplate);
  }

  open() {
    this.formulario.enable();
    this.formulario.reset();
    this.display = true;
  }

  edit(id: number) {
    this.reciboService.getReciboById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))

        this.formulario.patchValue({
          id: data.id,
          year: data.year,
          month: data.month,
          particulars: data.particulars.toString(),
          total: data.total.toString(),
          comments: data.comments.toString(),
          idDepartamento: data.idDepartamento.toString(),
          idEstadoRecibo: data.idEstadoRecibo.toString()
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontrado',
        });
      }
    })
    this.formulario.enable();
    this.editable = true;
    this.display = true;
  }

  view(id: number) {
    this.reciboService.getReciboById(id).subscribe({
      next: (data) => {

        this.formulario.patchValue({
          id: data.id,
          year: data.year,
          month: data.month,
          particulars: data.particulars.toString(),
          total: data.total.toString(),
          comments: data.comments.toString(),
          idDepartamento: data.idDepartamento.toString(),
          idEstadoRecibo: data.idEstadoRecibo.toString()
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontrado',
        });
      }
    })
    this.formulario.disable();
    this.editable = false;
    this.display = true;
  }

  close() {
    this.display = false;
    this.formulario.reset();
  }

  deleteResidencia() {
    this.recibos = [];
    this.idResidenciaSelect = "";
  }
}
