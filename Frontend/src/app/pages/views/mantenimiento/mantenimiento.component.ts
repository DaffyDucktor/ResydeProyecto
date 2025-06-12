import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MantenimientoService } from '../../service/mantenimiento.service';
import { Mantenimiento } from '../../model/mantenimiento';

@Component({
  selector: 'app-mantenimiento',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.scss'
})
export class MantenimientoComponent {
  mantenimientos: Mantenimiento[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private mantenimientoService: MantenimientoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllMantenimientos();
  }

  getAllMantenimientos() {
    this.mantenimientoService.getMantenimientos().subscribe((data) => {
      this.mantenimientos = data;
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
        this.getAllMantenimientos();
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

}
