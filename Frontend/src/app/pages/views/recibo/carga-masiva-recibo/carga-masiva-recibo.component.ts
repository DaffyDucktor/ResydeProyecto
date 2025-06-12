import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-carga-masiva-recibo',
  imports: [ButtonModule,FileUploadModule],
  templateUrl: './carga-masiva-recibo.component.html',
  styleUrl: './carga-masiva-recibo.component.scss'
})
export class CargaMasivaReciboComponent {

}
