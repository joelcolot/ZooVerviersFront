import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
    vvsLogoUrl:string="assets/zoo/VVS_Logo.jpg"
    pictures: string[]=[
      "assets/home-page/HérissonGrosPlan.jpg", 
      "assets/home-page/Couple de lynx.avif",
      "assets/home-page/Belette_et_son_terrier.jpg",
      "assets/home-page/Louve_et_ses_louveteaux.jpg"
    ];
    zooPicture1Url:string="assets/home-page/Louve_et_ses_louveteaux.jpg"

}
