import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Residente } from '../../model/residente';
import { ResidenteService } from '../../service/residente.service';

@Component({
  selector: 'app-residente',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './residente.component.html',
  styleUrl: './residente.component.scss'
})
export class ResidenteComponent {
  residentes: Residente[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private residenteService: ResidenteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllResidentes();
  }

  getAllResidentes() {
    this.residenteService.getResidentes().subscribe((data) => {
      this.residentes = data;
    });
  }

  deleteResidente(id: number) {
    this.isDeleteInProgress = true;
    this.residenteService.deleteResidente(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Residente eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllResidentes();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el residente',
        });
      },
    });
  }

}
