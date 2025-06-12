import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-usuario',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
usuarios: Usuario[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  getAllUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
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
}
