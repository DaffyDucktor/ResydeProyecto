import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Incidencia } from '../../model/incidencia';
import { IncidenciaService } from '../../service/incidencia.service';

@Component({
  selector: 'app-incidencia',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.scss'
})
export class IncidenciaComponent {
  incidencias: Incidencia[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private incidenciaService: IncidenciaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllIncidencias();
  }

  getAllIncidencias() {
    this.incidenciaService.getIncidencias().subscribe((data) => {
      this.incidencias = data;
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
        this.getAllIncidencias();
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

}
