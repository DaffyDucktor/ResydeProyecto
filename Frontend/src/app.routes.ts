import { Routes } from '@angular/router';
import { ReciboComponent } from './app/pages/views/recibo/recibo.component';
import { DepartamentoComponent } from './app/pages/views/departamento/departamento.component';
import { ResidenciaComponent } from './app/pages/views/residencia/residencia.component';
import { MainComponent } from './app/pages/views/main/main.component';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/views/main/dashboard';
import { IncidenciaComponent } from './app/pages/views/incidencia/incidencia.component';
import { MantenimientoComponent } from './app/pages/views/mantenimiento/mantenimiento.component';
import { PagoComponent } from './app/pages/views/pago/pago.component';
import { PaqueteComponent } from './app/pages/views/paquete/paquete.component';
import { RolComponent } from './app/pages/views/rol/rol.component';
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
            { path: 'uikit/rol', component: RolComponent },
            { path: 'uikit/usuario', component: UsuarioComponent },
            { path: 'uikit/visita', component: VisitaComponent }
        ]
    }
];
