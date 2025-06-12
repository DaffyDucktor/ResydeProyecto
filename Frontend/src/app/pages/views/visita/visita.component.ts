import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Visita } from '../../model/visita';
import { VisitaService } from '../../service/visita.service';

@Component({
  selector: 'app-visita',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './visita.component.html',
  styleUrl: './visita.component.scss'
})
export class VisitaComponent {
  visitas: Visita[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private visitaService: VisitaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllVisitas();
  }

  getAllVisitas() {
    this.visitaService.getVisitas().subscribe((data) => {
      this.visitas = data;
    });
  }

  deleteVisita(id: number) {
    this.isDeleteInProgress = true;
    this.visitaService.deleteVisita(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Visita eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllVisitas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el visita',
        });
      },
    });
  }
}
