import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Servicios
import { UsuarioService } from '../../service/usuario.service';

//Modelos
import { Usuario } from '../../model/usuario';

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
import { Residencia } from '../../model/residencia';
import { Residente } from '../../model/residente';
import { Rol } from '../../model/rol';
import { ResidenciaService } from '../../service/residencia.service';
import { ResidenteService } from '../../service/residente.service';
import { RolService } from '../../service/rol.service';
@Component({
  selector: 'app-usuario',
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
    FluidModule, SelectModule, TextareaModule, DialogModule, DropdownModule,
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

  constructor(
    private usuarioService: UsuarioService,
    private residenciaService: ResidenciaService,
    private residenteService: ResidenteService,
    private rolService: RolService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,

  ) {
    this.formulario = this.fb.group({
      id: [null],
      user: [null, Validators.required],
      password: [null, Validators.required],
      idResidencia: [null, Validators.required],
      idResidente: [null, Validators.required],
      idRol: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllUsuarios();
    this.getAllResidencias();
    this.getAllResidentes();
    this.getAllRoles();
  }

  getAllUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
            this.dropdownItemsRes.length = 0;
      data.forEach(element => {
        this.dropdownItemsRes.push({ name: element.direccion, code: element.id.toString() });
      });
    });
  }

  getAllResidentes() {
    this.residenteService.getResidentes().subscribe((data) => {
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
        this.getAllUsuarios();
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

  createUsuario() {
    if (this.formulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return
    }
    this.usuarioService.createUsuario(this.formulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Usuario guardado correctamente',
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
