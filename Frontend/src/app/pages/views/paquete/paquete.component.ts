import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Servicios
import { PaqueteService } from '../../service/paquete.service';
import { ResidenciaService } from '../../service/residencia.service';
import { DepartamentoService } from '../../service/departamento.service';
import { EstadoPaqueteService } from '../../service/estadoPaquete.service';

//Modelos
import { Paquete } from '../../model/paquete';
import { Residencia } from '../../model/residencia';
import { Departamento } from '../../model/departamento';
import { EstadoPaquete } from '../../model/estadoPaquete';

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
  selector: 'app-paquete',
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
    FluidModule, SelectModule, TextareaModule, DialogModule, DropdownModule, CalendarModule
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

  idResidenciaSelect: any;

  departamentos: Departamento[] = [];
  estadosPaquete: EstadoPaquete[] = [];

  dropdownItemsDep = [
    { name: '', code: '' }
  ];

  dropdownItemsEstPaq = [
    { name: '', code: '' }
  ];

  dropdownItemsRes = [
    { name: '', code: '' }
  ];

  display: boolean = false;
  editable: boolean = true;

  constructor(
    private paqueteService: PaqueteService,
    private residenciaService: ResidenciaService,
    private messageService: MessageService,
    private departamentoService: DepartamentoService,
    private estadoPaqueteService: EstadoPaqueteService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG
  ) {
    this.formulario = this.fb.group({
      id: [''],
      remitente: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      fechaInput: ['', Validators.required],
      hora: ['', Validators.required],
      horaInput: ['', Validators.required],
      codigo: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      idEstadoPaquete: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllResidencias();
    this.getAllEstados();
  }

  getResidencia() {
    this.getAllPaquetes(this.idResidenciaSelect);
    this.getAllDepartamentos(this.idResidenciaSelect);
  }

  getAllPaquetes(idResidencia: number) {
    this.paqueteService.getPaquetesByResidence(idResidencia).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Paquetes encontrados',
          });
        } else {
          this.messageService.add({
            severity: 'information',
            summary: 'Aviso',
            detail: 'No hay Paquetes creados para esta residencia',
          });
        }
        this.isDeleteInProgress = false;
        this.paquetes = data;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo encontrar Paquetes',
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

  getAllDepartamentos(idResidencia: number) {
    this.departamentoService.getDepartamentosByResidence(idResidencia).subscribe((data) => {
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
        this.getAllPaquetes(this.idResidenciaSelect);
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
    this.paqueteService.createPaquete(this.formulario.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Paquete guardada correctamente',
          });
          this.isSaveInProgress = false;
          this.close();
          this.getAllPaquetes(this.idResidenciaSelect);
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
    this.paqueteService.getPaqueteById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))
        const [dd, mm, yyyy] = data.fecha.split('-').map(Number);
        const fechaDate = new Date(yyyy, mm - 1, dd); // Recuerda: los meses empiezan desde 0
        const [horas, minutos] = data.hora.split(':').map(Number);
        const horaDate = new Date();
        horaDate.setHours(horas);
        horaDate.setMinutes(minutos);
        horaDate.setSeconds(0);

        this.formulario.patchValue({
          id: data.id,
          codigo: data.codigo,
          remitente: data.remitente,
          descripcion: data.descripcion,
          fechaInput: fechaDate,
          horaInput: horaDate,
          fecha: data.fecha,
          hora: data.hora,
          idDepartamento: data.idDepartamento.id.toString(),
          idEstadoPaquete: data.idEstadoPaquete.id.toString()
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
    this.paqueteService.getPaqueteById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))
        const [dd, mm, yyyy] = data.fecha.split('-').map(Number);
        const fechaDate = new Date(yyyy, mm - 1, dd); // Recuerda: los meses empiezan desde 0
        const [horas, minutos] = data.hora.split(':').map(Number);
        const horaDate = new Date();
        horaDate.setHours(horas);
        horaDate.setMinutes(minutos);
        horaDate.setSeconds(0);

        this.formulario.patchValue({
          id: data.id,
          codigo: data.codigo,
          remitente: data.remitente,
          descripcion: data.descripcion,
          fechaInput: fechaDate,
          horaInput: horaDate,
          fecha: data.fecha,
          hora: data.hora,
          idDepartamento: data.idDepartamento.id.toString(),
          idEstadoPaquete: data.idEstadoPaquete.id.toString()
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
    this.paquetes = [];
    this.idResidenciaSelect = null;
  }
}
