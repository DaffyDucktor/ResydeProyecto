import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Servicios
import { IncidenciaService } from '../../service/incidencia.service';
import { DepartamentoService } from '../../service/departamento.service';
import { ResidenciaService } from '../../service/residencia.service';

//Modelos
import { Incidencia } from '../../model/incidencia';
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
import { DatePickerModule } from 'primeng/datepicker';
import { Fluid } from 'primeng/fluid';
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
  selector: 'app-incidencia',
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
    FluidModule, SelectModule, TextareaModule, DialogModule, DropdownModule, Fluid, CalendarModule
  ],

  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.scss'
})
export class IncidenciaComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  incidencias: Incidencia[] = [];
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  idResidenciaSelect: any;

  dropdownItemsDep = [
    { name: '', code: '' }
  ];

  dropdownItemsRes = [
    { name: '', code: '' }
  ];
  display: boolean = false;
  editable: boolean = true;

  constructor(
    private incidenciaService: IncidenciaService,
    private residenciaService: ResidenciaService,
    private departamentoService: DepartamentoService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG
  ) {
    this.formulario = this.fb.group({
      id: [''],
      detalle: ['', Validators.required],
      fecha: ['', Validators.required],
      fechaInput: ['', Validators.required],
      hora: ['', Validators.required],
      horaInput: ['', Validators.required],
      idDepartamento: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllResidencias();
    this.getDepartamento();
  }

  getResidencia() {
    this.getAllIncidencias(this.idResidenciaSelect);
  }

  getAllIncidencias(idResidencia: number) {
    this.incidenciaService.getIncidenciasByResidence(idResidencia).subscribe({
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
        this.incidencias = data;
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


  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.dropdownItemsRes.length = 0;
      data.forEach(element => {
        this.dropdownItemsRes.push({ name: element.nombre, code: element.id.toString() });
      });
    });
  }

  getDepartamento() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.dropdownItemsDep.length = 0;
      this.dropdownItemsDep.push({ name: 'Residencia', code: '' });
      data.forEach(element => {
        this.dropdownItemsDep.push({ name: element.codigo, code: element.id.toString() });
      });
    });
  }

  deleteIncidencia(id: number) {
    this.isDeleteInProgress = true;
    this.incidenciaService.deleteIncidencia(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Incidencia eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllIncidencias(this.idResidenciaSelect);
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el incidencia',
        });
      },
    });
  }
  createIncidencia() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.incidenciaService.createIncidencia(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Incidencia guardada correctamente',
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
    const fecha = this.formulario.get('fechaInput')?.value;
    const hora = this.formulario.get('horaInput')?.value;
    this.formulario.patchValue({
      fecha: formatDate(fecha, 'dd-MM-yyyy', 'en-US'),
      hora: formatDate(hora, 'HH:mm', 'en-US')
    });

    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }

    this.isSaveInProgress = true;
    this.incidenciaService.createIncidencia(this.formulario.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Incidencia guardada correctamente',
          });
          this.isSaveInProgress = false;
          this.close();
          this.getAllIncidencias(this.idResidenciaSelect);
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

  openAddForm(): void {
    this.dialog.open(this.dialogTemplate);
  }

  open() {
    this.formulario.enable();
    this.formulario.reset();
    this.display = true;
  }

  edit(id: number) {
    this.incidenciaService.getIncidenciaById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))
                  const [dia, mes, anio] = data.fecha.split('/').map(Number);
const fechaDate = new Date(anio, mes - 1, dia);
const [horas, minutos] = data.hora.split(':').map(Number);
const horaDate = new Date();
horaDate.setHours(horas);
horaDate.setMinutes(minutos);
horaDate.setSeconds(0);

        this.formulario.patchValue({
          id: data.id,
          detalle: data.detalle,

          fechaInput: fechaDate,
          horaInput: horaDate,
          fecha: data.fecha,
          hora: data.hora,
          idDepartamento: { name: data.idDepartamento.codigo, code: data.idDepartamento.id.toString() }
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
    this.incidenciaService.getIncidenciaById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))
        this.formulario.patchValue(data);
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
    this.incidencias = [];
    this.idResidenciaSelect = null;
  }
}
