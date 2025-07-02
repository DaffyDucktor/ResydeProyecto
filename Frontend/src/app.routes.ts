import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { ReciboComponent } from './app/pages/views/recibo/recibo.component';
import { DepartamentoComponent } from './app/pages/views/departamento/departamento.component';
import { ResidenciaComponent } from './app/pages/views/residencia/residencia.component';
import { IncidenciaComponent } from './app/pages/views/incidencia/incidencia.component';
import { MantenimientoComponent } from './app/pages/views/mantenimiento/mantenimiento.component';
import { PagoComponent } from './app/pages/views/pago/pago.component';
import { PaqueteComponent } from './app/pages/views/paquete/paquete.component';
import { UsuarioComponent } from './app/pages/views/usuario/usuario.component';
import { ResidenteComponent } from './app/pages/views/residente/residente.component';
import { VisitaComponent } from './app/pages/views/visita/visita.component';
import { CargaMasivaPagoComponent } from './app/pages/views/pago/carga-masiva-pago/carga-masiva-pago.component';
import { CargaMasivaReciboComponent } from './app/pages/views/recibo/carga-masiva-recibo/carga-masiva-recibo.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit/departamento', component: DepartamentoComponent },
            { path: 'uikit/incidencia', component: IncidenciaComponent },
            { path: 'uikit/mantenimiento', component: MantenimientoComponent },
            { path: 'uikit/pago', component: PagoComponent },
            { path: 'uikit/pago/cargaMasiva', component: CargaMasivaPagoComponent },
            { path: 'uikit/paquete', component: PaqueteComponent },
            { path: 'uikit/recibo', component: ReciboComponent },
            { path: 'uikit/recibo/cargaMasiva', component: CargaMasivaReciboComponent },
            { path: 'uikit/residencia', component: ResidenciaComponent },
            { path: 'uikit/residente', component: ResidenteComponent },
            { path: 'uikit/usuario', component: UsuarioComponent },
            { path: 'uikit/visita', component: VisitaComponent },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
