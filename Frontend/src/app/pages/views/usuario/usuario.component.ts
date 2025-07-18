import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Servicios
import { UsuarioService } from '../../service/usuario.service';
import { ResidenciaService } from '../../service/residencia.service';
import { ResidenteService } from '../../service/residente.service';
import { RolService } from '../../service/rol.service';

//Modelos
import { Usuario } from '../../model/usuario';
import { Residencia } from '../../model/residencia';
import { Residente } from '../../model/residente';
import { Rol } from '../../model/rol';

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
  selector: 'app-usuario',
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
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  usuarios: Usuario[] = [];
  @ViewChild('modalTemplate') dialogTemplate!: TemplateRef<any>;
  isDeleteInProgress: boolean = false;
  formulario!: FormGroup;
  isSaveInProgress: boolean = false;
  residencias: Residencia[] = [];
  residentes: Residente[] = [];
  roles: Rol[] = [];

  idResidenciaSelect: any;
  dropdownItemsRes = [
    { name: '', code: '' }
  ];

  dropdownItemsResi = [
    { name: '', code: '' }
  ];

  dropdownItemsRol = [
    { name: '', code: '' }
  ];
  display: boolean = false;
  editable: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private residenciaService: ResidenciaService,
    private residenteService: ResidenteService,
    private rolService: RolService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private primeng: PrimeNG
  ) {
    this.formulario = this.fb.group({
      id: [''],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      idResidencia: ['', Validators.required],
      idResidente: [''],
      idRol: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getAllResidencias();
    this.getAllRoles();
  }
  getResidencia() {
    this.getAllUsuarios(this.idResidenciaSelect);
    this.getAllResidentes(this.idResidenciaSelect);
  }

  getAllUsuarios(idResidencia: number) {
    this.usuarioService.getUsuariosByResidence(idResidencia).subscribe({
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
        this.usuarios = data;
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

  getAllResidentes(idResidencia: number) {
    this.residenteService.getResidentesByResidence(idResidencia).subscribe((data) => {
      this.dropdownItemsResi.length = 0;
      data.forEach(element => {
        this.dropdownItemsResi.push({ name: (element.nombre + " " + element.apellido), code: element.id.toString() });
      });
    });
  }

  getAllRoles() {
    this.rolService.getRols().subscribe((data) => {
      this.dropdownItemsRol.length = 0;
      data.forEach(element => {
        this.dropdownItemsRol.push({ name: element.nombre, code: element.id.toString() });
      });
    });
  }

  deleteUsuario(id: number) {
    this.isDeleteInProgress = true;
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Usuario eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllUsuarios(this.idResidenciaSelect);
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el usuario',
        });
      },
    });
  }

  submitForm() {
    this.formulario.patchValue({
      idResidente: this.idResidenciaSelect.toString()
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
    this.usuarioService.createUsuario(this.formulario.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Incidencia guardada correctamente',
          });
          this.isSaveInProgress = false;
          this.close();
          this.getAllUsuarios(this.idResidenciaSelect);
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
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data))

        this.formulario.patchValue({
          id: data.id,
          user: data.usuario,
          password: data.password,
          idResidencia: data.idResidencia.toString(),
          idResidente: data.idResidente.toString(),
          idRol: data.idRol.toString()
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
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (data) => {

        this.formulario.patchValue({
          id: data.id,
          user: data.usuario,
          password: data.password,
          idResidencia: data.idResidencia.toString(),
          idResidente: data.idResidente.toString(),
          idRol: data.idRol.toString()
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
    this.usuarios = [];
    this.idResidenciaSelect = null;
  }
}
