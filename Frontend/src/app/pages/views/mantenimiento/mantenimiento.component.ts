import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//service
import { MantenimientoService } from '../../service/mantenimiento.service';
import { DepartamentoService } from '../../service/departamento.service';
import { EstadoDepartamentoService } from '../../service/estadoDepartamento.service';
import { EstadoMantenimientoService } from '../../service/estadoMantenimiento.service';
import { ResidenciaService } from '../../service/residencia.service';

//modelo
import { Mantenimiento } from '../../model/mantenimiento';
import { Departamento } from '../../model/departamento';
import { EstadoDepartamento } from '../../model/estadoDepartamento';
import { EstadoMantenimiento } from '../../model/estadoMantenimiento';
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
  selector: 'app-mantenimiento',
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

  idResidenciaSelect: any;

  dropdownItemsDep = [
    { name: '', code: '' }
  ];

  dropdownItemsEstMant = [
    { name: '', code: '' }
  ];

  dropdownItemsRes = [
    { name: '', code: '' }
  ];

  display: boolean = false;
  editable: boolean = true;

  constructor(
    private mantenimientoService: MantenimientoService,
    private residenciaService: ResidenciaService,
    private messageService: MessageService,
    private departamentoService: DepartamentoService,
    private estadosMantenimientoService: EstadoMantenimientoService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG

  ) {
    this.formulario = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
      fechaIni: ['', Validators.required],
      fechaFin: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      idEstadoMantenimiento: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllResidencias();
    this.getAllDepartamentos();
    this.getAllEstadoMantenimientos();
  }

  getResidencia() {
    this.getAllMantenimientos(this.idResidenciaSelect);
  }

  getAllMantenimientos(idResidencia: number) {
    this.mantenimientoService.getMantenimientosByResidence(idResidencia).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Mantenimientos encontrados',
          });
        } else {
          this.messageService.add({
            severity: 'information',
            summary: 'Aviso',
            detail: 'No hay Mantenimientos creados para esta residencia',
          });
        }
        this.isDeleteInProgress = false;
        this.mantenimientos = data;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo encontrar Mantenimientos',
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
        this.getAllMantenimientos(this.idResidenciaSelect);
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
        this.getAllMantenimientos(this.idResidenciaSelect);
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
    const fechaIni = this.formulario.get('fechaIniInput')?.value;
    const fechaFin = this.formulario.get('fechaFinInput')?.value;
    this.formulario.patchValue({
      fechaIni: formatDate(fechaIni, 'dd-MM-yyyy', 'en-US'),
      fechaFin: formatDate(fechaFin, 'dd-MM-yyyy', 'en-US'),
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
    this.mantenimientoService.createMantenimiento(this.formulario.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Mantenimiento guardado correctamente',
          });
          this.isSaveInProgress = false;
          this.close();
          this.getAllMantenimientos(this.idResidenciaSelect);
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
    this.mantenimientoService.getMantenimientoById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))
        const [ddIni, mmIni, yyyyIni] = data.fechaIni.split('-').map(Number);
        const fechaIniDate = new Date(yyyyIni, mmIni - 1, ddIni); // Recuerda: los meses empiezan desde 0
        const [ddFin, mmFin, yyyyFin] = data.fechaFin.split('-').map(Number);
        const fechaFinDate = new Date(yyyyFin, mmFin - 1, ddFin); // Recuerda: los meses empiezan desde 0

        this.formulario.patchValue({
          id: data.id,
          descripcion: data.descripcion,
          fechaIniInput: fechaIniDate,
          fechaFinInput: fechaFinDate,
          fechaIni: data.fechaIni,
          fechaFin: data.fechaFin,
          idDepartamento: data.idDepartamento.id.toString(),
          idEstadoMantenimiento: data.idEstadoMantenimiento.id.toString()
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
    this.mantenimientoService.getMantenimientoById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))
        const [ddIni, mmIni, yyyyIni] = data.fechaIni.split('-').map(Number);
        const fechaIniDate = new Date(yyyyIni, mmIni - 1, ddIni); // Recuerda: los meses empiezan desde 0
        const [ddFin, mmFin, yyyyFin] = data.fechaFin.split('-').map(Number);
        const fechaFinDate = new Date(yyyyFin, mmFin - 1, ddFin); // Recuerda: los meses empiezan desde 0

        this.formulario.patchValue({
          id: data.id,
          descripcion: data.descripcion,
          fechaIniInput: fechaIniDate,
          fechaFinInput: fechaFinDate,
          fechaIni: data.fechaIni,
          fechaFin: data.fechaFin,
          idDepartamento: data.idDepartamento.id.toString(),
          idEstadoMantenimiento: data.idEstadoMantenimiento.id.toString()
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
    this.mantenimientos = [];
    this.idResidenciaSelect = null;
  }
}
