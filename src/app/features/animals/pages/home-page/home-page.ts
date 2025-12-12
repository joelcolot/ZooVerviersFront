import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";
import { Spinner } from "@components/animation/spinner/spinner";

@Component({
  selector: 'app-home-page',
  imports: [TranslatePipe, RouterLink, Spinner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
    vvsLogoUrl:string="assets/zoo/VVS_Logo.jpg"
    i: number = 1;
    gender:string="male";
    pictures: string[]=[
        "assets/home-page/HérissonGrosPlan.jpg", 
        "assets/home-page/lynxEurope.jpg",
        "assets/home-page/beletteEurope.jpg",
        "assets/home-page/loupsEurope.jpg"
    ];
    zooPicture1Url:string="assets/home-page/HérissonGrosPlan.jpg"

    nextPicture()
    {
        this.i+=1;
        this.zooPicture1Url=this.pictures[this.i%this.pictures.length];
    }
    previousPicture()
    {
        this.i-=1;
        if (this.i<0)
        {
            this.i+=this.pictures.length;
        }
        this.zooPicture1Url=this.pictures[this.i%this.pictures.length];
    }

}
