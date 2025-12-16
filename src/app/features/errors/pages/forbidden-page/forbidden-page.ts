import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forbidden-page',
  imports: [TranslatePipe],
  templateUrl: './forbidden-page.html',
  styleUrl: './forbidden-page.scss',
})
export class ForbiddenPage {

}
