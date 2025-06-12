import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DepartamentoService } from '../../service/departamento.service';
import { Departamento } from '../../model/departamento';

@Component({
  selector: 'app-departamento',
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.scss',
})
export class DepartamentoComponent {
  departamentos: Departamento[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private departamentoService: DepartamentoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllDepartamentos();
  }

  getAllDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  deleteDepartamento(id: number) {
    this.isDeleteInProgress = true;
    this.departamentoService.deleteDepartamento(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Departamento eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllDepartamentos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el departamento',
        });
      },
    });
  }
}
