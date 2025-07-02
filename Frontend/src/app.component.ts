import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule, ToastModule],
    template: `<p-toast />
    <router-outlet></router-outlet>`
})
export class AppComponent {}
