import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "@components/layout/nav-bar/nav-bar";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('ZooVerviers');
  private readonly _translate = inject(TranslateService);

  ngOnInit(): void {
    // Définition des langues disponibles
    this._translate.addLangs(['fr', 'en', 'eo', 'jv', 'ka']);

    // Langue de secours
    this._translate.setFallbackLang('fr');

    // Langue par défaut
    this._translate.use('fr');
  }
}
