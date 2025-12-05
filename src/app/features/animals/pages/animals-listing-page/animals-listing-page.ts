import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.getAnimals();
  }

  private readonly _animalsService = inject(AnimalsService)

  total: number = 0;

  animals: AnimalsListing[] | null = null;
  animalsError: string | null = null;

  async getAnimals() {

    try {
      const response = await this._animalsService.getAnimals(0);
      this.animals = response;
      console.log(response);


    } catch (err) {
      console.error(err);
      this.animalsError = (err as ApiError).message;
    }
  }
}
