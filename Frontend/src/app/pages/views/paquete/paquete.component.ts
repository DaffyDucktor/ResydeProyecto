import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Paquete } from '../../model/paquete';
import { PaqueteService } from '../../service/paquete.service';

@Component({
  selector: 'app-paquete',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.scss'
})
export class PaqueteComponent {
  paquetes: Paquete[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private paqueteService: PaqueteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllPaquetes();
  }

  getAllPaquetes() {
    this.paqueteService.getPaquetes().subscribe((data) => {
      this.paquetes = data;
    });
  }

  deletePaquete(id: number) {
    this.isDeleteInProgress = true;
    this.paqueteService.deletePaquete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Paquete eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllPaquetes();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el paquete',
        });
      },
    });
  }

}
