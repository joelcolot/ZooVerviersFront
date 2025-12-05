import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "@components/layout/nav-bar/nav-bar";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private readonly _translate = inject(TranslateService);

  protected readonly title = signal('ZooVerviers');

    ngOnInit(): void {
    // Définition des langues disponibles
    this._translate.addLangs(['fr', 'en', 'eo', 'jv', 'ka']);

    // Langue de secours
    this._translate.setFallbackLang('fr');

    // Langue par défaut
    this._translate.use('fr');
  }
}
