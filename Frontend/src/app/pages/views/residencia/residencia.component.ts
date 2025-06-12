import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Residencia } from '../../model/residencia';
import { ResidenciaService } from '../../service/residencia.service';

@Component({
  selector: 'app-residencia',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './residencia.component.html',
  styleUrl: './residencia.component.scss'
})
export class ResidenciaComponent {
  residencias: Residencia[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private residenciaService: ResidenciaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllResidencias();
  }

  getAllResidencias() {
    this.residenciaService.getResidencias().subscribe((data) => {
      this.residencias = data;
    });
  }

  deleteResidencia(id: number) {
    this.isDeleteInProgress = true;
    this.residenciaService.deleteResidencia(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Residencia eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllResidencias();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el residencia',
        });
      },
    });
  }
}
