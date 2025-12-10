import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnimalsDetails } from '@core/models/animals-details.model';
import { ApiError } from '@core/models/api-error.model';
import { AnimalsService } from '@core/services/animals.service';
declare var bootstrap: any;

@Component({
  selector: 'app-animals-details-page',
  imports: [AnimalsDetailsPage, RouterModule, DatePipe],
  templateUrl: './animals-details-page.html',
  styleUrl: './animals-details-page.scss',
})
export class AnimalsDetailsPage {

  private readonly _route = inject(ActivatedRoute);
  private readonly _animalsService = inject(AnimalsService);

  
  id! :number;
  animal: AnimalsDetails | null = null;
  age :string = Date();
  description :string | undefined;
  animalError: string | null = null;



  ngOnInit() {
    this._route.params.subscribe(params => {
      const name = params['name'] as string;
      this.getAnimalDetails(name);

    });
  }

  async getAnimalDetails(name :string) :Promise<void> {

    try {
      
      const response = await this._animalsService.getAnimalDetails(name);
      this.animal = response;
      this.age = this._animalsService.getAge(this.animal.birthDate);

      const speciesList = await this._animalsService.getAnimalSpecies();
      const species = speciesList.find(s => s.name === response.speciesName);

      this.description = species?.description;

      
      
      this.animalError = null;

    } catch (err) {
      console.error(err);
      this.animal = null;
      this.animalError = (err as ApiError).message;
    }

  }

}
