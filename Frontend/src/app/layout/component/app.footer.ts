import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Resyde by
        <a href="https://www.uclubperu.com/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Uclub S.R.L.</a>
    </div>`
})
export class AppFooter {}
