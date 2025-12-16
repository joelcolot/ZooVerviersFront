import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Spinner } from "@components/animation/spinner/spinner";
import { AnimalsDetails, ApiError } from '@core/models';
import { AnimalsService } from '@core/services';
import { getAge } from '@core/utils/utils';

@Component({
  selector: 'app-animals-details-page',
  imports: [RouterModule, DatePipe, TranslatePipe, Spinner],
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
      this.age = getAge(this.animal.birthDate);

      const speciesList = await this._animalsService.getAnimalSpecies();
      const species = speciesList.find(s => s.name === response.speciesName);

      //this.description = species?.description;

      console.log(this.animal);
      
      this.animalError = null;

    } catch (err) {
      console.error(err);
      this.animal = null;
      this.animalError = (err as ApiError).message;
    }

  }

}
