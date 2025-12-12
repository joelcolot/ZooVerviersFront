import { Component, inject } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgbCollapseModule, RouterModule, TranslatePipe],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss']
})
export class NavBar {
  private readonly _translate = inject(TranslateService);
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);
  isCollapsed = true;
  firstName: string | undefined=undefined;
  lastName: string | undefined=undefined;
  //fullName: string[2] | undefined=undefined;
  isConnected(): boolean
  {
    return this._auth.isConnected();
  }
  async OnInit()
  {
    this.firstName= await this._auth.getAccount().then(y =>  y?.firstName);
    this.lastName=await this._auth.getAccount().then(y => y?.lastName);
  }

    onSelectLanguage(lang: any) 
    {
        this._translate.use(lang.target.value);
    }
    logout()
    {
      this._auth.logout();
      this.firstName=undefined;
      this.lastName=undefined;
      //this.isConnected=this._auth.isConnected();
      this._router.navigate(["/"]);
    }

    
}
