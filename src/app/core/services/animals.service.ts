import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AnimalsListing } from '@core/models/animals-listing.model';
import { ApiResponseList } from '@core/models/api-response.model';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  
  private readonly _httpClient = inject(HttpClient);

  getAnimals(page: number = 0, sizePage :number = 5) :Promise<AnimalsListing[]> {

    return firstValueFrom(
       this._httpClient.get<AnimalsListing[]>(environment.apiUrl + 'api/Animal', {

        params: {
          page: page,
          sizePage: sizePage,
        },
      }),
    );
  }
}
