import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { animalsCreate, AnimalsDetails, AnimalsListing } from '@core/models';
import { AnimalSpecies } from '@core/models/animals/animalspecies.model';
import { animalsUpdate } from '@core/models/animals-update.model';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';
import { ToysListing } from '@core/models/toys/toys-listing.model';

@Injectable({
  providedIn: 'root',
})
export class ToysService {

  private readonly _httpClient = inject(HttpClient);



  getToys(page: number = 0, sizePage :number = 5) :Promise<ToysListing[]> {

    return firstValueFrom(
       this._httpClient.get<ToysListing[]>(environment.apiUrl + 'api/Toy', {

        params: {
          page: page,
          sizePage: sizePage,
        },
      }),
    );
  }
}