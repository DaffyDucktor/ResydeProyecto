import { Component, Input, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidenciaService } from '../../service/residencia.service';
import { DepartamentoService } from '../../service/departamento.service';
import { ResidenteService } from '../../service/residente.service';
import { ReciboService } from '../../service/recibo.service';
import { PagoService } from '../../service/pago.service';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Residencias</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{residencias}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-building text-blue-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Departamentos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{departamentos}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-home text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Residentes</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{residentes}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Comments</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{comments}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Recibos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{recibos}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-receipt text-purple-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Pagos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{pagos}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-receipt text-purple-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Ingresos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ingresos}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Egresos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{egresos}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>`
})
export class StatsWidget {

    residencias: Number = 0;
    departamentos: Number = 0;
    residentes: Number = 0;
    comments: Number = 0;
    recibos: Number = 0;
    pagos: Number = 0;
    ingresos: Number = 0;
    egresos: Number = 0;

    constructor(
        private residenciaService: ResidenciaService,
        private departamentoService: DepartamentoService,
        private residenteService: ResidenteService,
        private reciboService: ReciboService,
        private pagoService: PagoService,
    ) {
    }

    ngOnInit(): void {
        this.getResidenciaCount();
        this.getDepartamentoCount();
        this.getResidenteCount();
        this.getReciboCount();
        this.getPagoCount();
        this.getIngresos();
        this.getEgresos();
    }

    getResidenciaCount() {
        this.residenciaService.getCount().subscribe((data) => {
            this.residencias = data;
        });
    } 
    getDepartamentoCount() {
        this.departamentoService.getCount().subscribe((data) => {
            this.departamentos = data;
        });
    } 
    getResidenteCount() {
        this.residenteService.getCount().subscribe((data) => {
            this.residentes = data;
        });
    } 
    getCommentCount() {
        
    } 
    getReciboCount() {
        this.reciboService.getCount().subscribe((data) => {
            this.recibos = data;
        });
    } 
    getPagoCount() {
        this.pagoService.getCount().subscribe((data) => {
            this.pagos = data;
        });
    } 
    getIngresos() {
        this.reciboService.getBalance().subscribe((data) => {
            this.ingresos = data;
        });
    } 
    getEgresos() {
        this.pagoService.getBalance().subscribe((data) => {
            this.egresos = data;
        });
    }
}
