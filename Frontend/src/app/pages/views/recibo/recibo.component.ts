import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Recibo } from '../../model/recibo';
import { ReciboService } from '../../service/recibo.service';

@Component({
  selector: 'app-recibo',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './recibo.component.html',
  styleUrl: './recibo.component.scss'
})
export class ReciboComponent {
  recibos: Recibo[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private reciboService: ReciboService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllRecibos();
  }

  getAllRecibos() {
    this.reciboService.getRecibos().subscribe((data) => {
      this.recibos = data;
    });
  }

  deleteRecibo(id: number) {
    this.isDeleteInProgress = true;
    this.reciboService.deleteRecibo(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Recibo eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllRecibos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el recibo',
        });
      },
    });
  }

}
