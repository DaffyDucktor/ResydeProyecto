import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Rol } from '../../model/rol';
import { RolService } from '../../service/rol.service';

@Component({
  selector: 'app-rol',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent {
  roles: Rol[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private rolService: RolService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllRols();
  }

  getAllRols() {
    this.rolService.getRols().subscribe((data) => {
      this.roles = data;
    });
  }

  deleteRol(id: number) {
    this.isDeleteInProgress = true;
    this.rolService.deleteRol(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Rol eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllRols();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el rol',
        });
      },
    });
  }
}
