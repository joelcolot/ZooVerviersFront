import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AnimalsDetails } from '@core/models/animals-details.model';
import { AnimalsListing } from '@core/models/animals-listing.model';
import { AnimalSpecies } from '@core/models/animalspecies.model';
import { ApiResponseList } from '@core/models/api-response.model';
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

  getAge(birthDate: string | Date): string {
    const dob = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age <= 0) {
      return '< 1 an';
    }

    return age + ' ' + (age > 1 ? 'ans' : 'an');
  }

  createAnimal(animal: AnimalsDetails) : Promise<void> {

    return firstValueFrom(this._httpClient.post<void>(environment.apiUrl + 'api/Animal/Birth', animal));

  }
}
