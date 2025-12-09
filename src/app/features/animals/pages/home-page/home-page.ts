import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [TranslatePipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
    vvsLogoUrl:string="assets/zoo/VVS_Logo.jpg"
    //zooPicture1Url:string="assets/zoo/Picture_zoo_1.webp"
}
