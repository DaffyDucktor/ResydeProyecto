import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Pago } from '../../model/pago';
import { PagoService } from '../../service/pago.service';
import { ResidenciaService } from '../../service/residencia.service';

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
import { Recibo } from '../../model/recibo';
import { ReciboService } from '../../service/recibo.service';

@Component({
  selector: 'app-pago',
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
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  pagos: Pago[] = [];
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;
  dropdownItemsRes = [
    { name: '', code: '' }
  ];
  recibos: Recibo[] = [];
  idResidenciaSelect: any;

  dropdownItemsRec = [
    { name: '', code: '' }
  ];
  display: boolean = false;
  editable: boolean = true;

  constructor(
    private pagoService: PagoService,
    private residenciaService: ResidenciaService,
    private messageService: MessageService,
    private reciboService: ReciboService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG

  ) {
    this.formulario = this.fb.group({
      id: [""],
      paidAmount: ["", Validators.required],
      balance: ["", Validators.required],
      mora: ["", Validators.required],
      fechaInput: ["", Validators.required],
      fecha: ["", Validators.required],
      comments: ["", Validators.required],
      idRecibo: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllResidencias();
  }
  getResidencia() {
    this.getAllPagos(this.idResidenciaSelect);
    this.getAllRecibos(this.idResidenciaSelect);
  }
  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.dropdownItemsRes.length = 0;
      data.forEach(element => {
        this.dropdownItemsRes.push({ name: element.nombre, code: element.id.toString() });
      });
    });
  }
  getAllPagos(idResidencia: number) {
    this.pagoService.getPagosByResidence(idResidencia).subscribe({
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
        this.pagos = data;
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

  getAllRecibos(idResidencia: number) {
    this.reciboService.getRecibosByResidence(idResidencia).subscribe((data) => {
      this.dropdownItemsRec.length = 0;
      data.forEach(element => {
        this.dropdownItemsRec.push({ name: (element.year + "|" + element.month), code: element.id.toString() });
      });
    });
  }

  deletePago(id: number) {
    this.isDeleteInProgress = true;
    this.pagoService.deletePago(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Pago eliminado',
        });
        this.isDeleteInProgress = false;
        //this.getAllPagos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el pago',
        });
      },
    });
  }


  submitForm() {
    const fecha = this.formulario.get('fechaInput')?.value;
    this.formulario.patchValue({
      fecha: formatDate(fecha, 'dd-MM-yyyy', 'en-US'),
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
    this.pagoService.createPago(this.formulario.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Incidencia guardada correctamente',
          });
          this.isSaveInProgress = false;
          this.close();
          this.getAllPagos(this.idResidenciaSelect);
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
    this.pagoService.getPagoById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))

        this.formulario.patchValue({
          id: data.id,
          paidAmount: data.paidAmount,
          balance: data.balance,
          mora: data.mora.toString(),
          fecha: data.fecha.toString(),
          comments: data.comments.toString(),
          idRecibo: data.idRecibo.toString(),
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
    this.pagoService.getPagoById(id).subscribe({
      next: (data) => {

        this.formulario.patchValue({
          id: data.id,
          paidAmount: data.paidAmount,
          balance: data.balance,
          mora: data.mora.toString(),
          fecha: data.fecha.toString(),
          comments: data.comments.toString(),
          idRecibo: data.idRecibo.toString(),
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
    this.pagos = [];
    this.idResidenciaSelect = "";
  }
}
