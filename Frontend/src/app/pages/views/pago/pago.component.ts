import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Pago } from '../../model/pago';
import { PagoService } from '../../service/pago.service';

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
import { Recibo } from '../../model/recibo';
import { ReciboService } from '../../service/recibo.service';

@Component({
  selector: 'app-pago',
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
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {
    @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
pagos: Pago[] = [];
  isDeleteInProgress: boolean = false;
    formulario!: FormGroup;
  isSaveInProgress: boolean = false;

  recibos: Recibo[] = [];

    dropdownItemsRec = [
        { name: '', code: '' }
    ];
  display: boolean = false;

  constructor(
    private pagoService: PagoService,
    private messageService: MessageService,
    private reciboService: ReciboService,
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
    this.getAllPagos();
    this.getAllRecibos();
  }

  getAllPagos() {
    this.pagoService.getPagos().subscribe((data) => {
      this.pagos = data;
    });
  }

  getAllRecibos() {
    this.reciboService.getRecibos().subscribe((data) => {
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
        this.getAllPagos();
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
 createPago() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.pagoService.createPago(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Pago guardado correctamente',
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
    this.display = true;
  }

  close() {
    this.display = false;
  }
}
