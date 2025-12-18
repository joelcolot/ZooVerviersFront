import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AnimalSpecies, AnimalsListing, AnimalsDetails, animalsCreate } from '@core/models';
import { animalsUpdate } from '@core/models/animals-update.model';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  
  private readonly _httpClient = inject(HttpClient);

  private _speciesCache: AnimalSpecies[] | null = null;
  private _speciesPromise: Promise<AnimalSpecies[]> | null = null;

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

  getAnimalDetails(name: string) :Promise<AnimalsDetails> {

    return firstValueFrom(
      this._httpClient.get<AnimalsDetails>(environment.apiUrl + 'api/Animal/' + name)

    );
  }
  getAnimalDetailsById(id: number) :Promise<AnimalsDetails> {

    return firstValueFrom(
      this._httpClient.get<AnimalsDetails>(environment.apiUrl + 'api/Animal/ById/' + id)

    );
  }

  getAnimalSpecies(): Promise<AnimalSpecies[]> {

    if (this._speciesCache) {
      return Promise.resolve(this._speciesCache);
    }

    if (this._speciesPromise) {
      return this._speciesPromise;
    }

    this._speciesPromise = firstValueFrom(
      this._httpClient.get<AnimalSpecies[]>(
        environment.apiUrl + 'api/Animal/AnimalSpecies',
      ),
    ).then(list => {
      this._speciesCache = list;
      return list;
    }).finally(() => {
      this._speciesPromise = null;
    });

    return this._speciesPromise;
  }

  createAnimal(animal: animalsCreate) : Promise<void> {

    

    return firstValueFrom(this._httpClient.post<void>(environment.apiUrl + 'api/Animal/Create', animal));

  }

  modifyAnimal(id: number, animal: animalsUpdate): Promise<void> {
    return firstValueFrom(
      this._httpClient.patch<void>(
        `${environment.apiUrl}api/Animal/Modification/${id}`,
        animal
      )
    );
  }

  deleteAnimal(id: number) :Promise<void> {
    return firstValueFrom(
      this._httpClient.post<void>(environment.apiUrl + 'api/Animal/Delete', id)
    )
  }
}
