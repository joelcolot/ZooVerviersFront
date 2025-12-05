import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalsListing } from '@core/models/animals-listing.model';
import { ApiError } from '@core/models/api-error.model';
import { AnimalsService } from '@core/services/animals.service';

@Component({
  selector: 'app-animals-listing-page',
  imports: [JsonPipe],
  templateUrl: './animals-listing-page.html',
  styleUrl: './animals-listing-page.scss',
})
export class AnimalsListingPage implements OnInit {

  private readonly _animalsService = inject(AnimalsService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  animals: AnimalsListing[] | null = null;
  animalsError: string | null = null;

  page :number = 1;
  pageSize :number = 5;
  pageSizeOptions :number[] = [5,10,25,50];

  ngOnInit(): void {

    const qp = this._route.snapshot.queryParams;
    this.page = Number(qp['page']) || 1;
    this.page = Number(qp['pageSize']) || 5;

    this.getAnimals();
  }

  async getAnimals(): Promise<void> {
    try {
      // API reste en 0-based : page - 1
      const response = await this._animalsService.getAnimals(this.page - 1, this.pageSize);
      this.animals = response;
      this.animalsError = null;
    } catch (err) {
      console.error(err);
      this.animals = null;
      this.animalsError = (err as ApiError).message;
    }
  }

  // clic sur "Précédent" / "Suivant"
  goToPage(page: number): void {
    if (page < 1) return;

    this.page = page;
    this.getAnimals();

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: this.page,
        pageSize: this.pageSize,
      },
      // pas besoin de queryParamsHandling ici, on écrase juste page/pageSize
    });
  }

  // changement du select "# par page"
  changePageSize(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (!value) return;

    this.pageSize = value;
    this.page = 1;  // retour page 1
    this.getAnimals();

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: this.page,
        pageSize: this.pageSize,
      },
    });
  }
}
