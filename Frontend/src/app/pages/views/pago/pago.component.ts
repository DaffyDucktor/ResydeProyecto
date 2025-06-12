import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Pago } from '../../model/pago';
import { PagoService } from '../../service/pago.service';

@Component({
  selector: 'app-pago',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {
  pagos: Pago[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private pagoService: PagoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllPagos();
  }

  getAllPagos() {
    this.pagoService.getPagos().subscribe((data) => {
      this.pagos = data;
    });
  }

  deletePago(id: number) {
    this.isDeleteInProgress = true;
    this.pagoService.deletePago(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Pago eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllPagos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el pago',
        });
      },
    });
  }

}
