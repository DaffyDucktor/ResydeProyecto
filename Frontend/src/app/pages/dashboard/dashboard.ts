import { Component, OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { UsuarioService } from '../service/usuario.service';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <div class="col-span-12 xl:col-span-6">
                <!--app-recent-sales-widget />
                <app-best-selling-widget /-->
            </div>
            <div class="col-span-12 xl:col-span-6">
                <!--app-revenue-stream-widget />
                <app-notifications-widget /-->
            </div>
        </div>
    `
})
export class Dashboard implements OnInit {

    constructor(public userService: UsuarioService) { }

    ngOnInit(): void {
        this.getUserLogged();
    }

    getUserLogged() {
        this.userService.getUsuarioById(2).subscribe((user) => {
            console.log(user);
        });
    }
}
