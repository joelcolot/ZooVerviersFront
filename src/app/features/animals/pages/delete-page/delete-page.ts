import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationModal } from '@components/modals/validation-modal/validation-modal';
import { AnimalsDetails, ApiError } from '@core/models';
import { AnimalsService } from '@core/services';

@Component({
  selector: 'app-delete-page',
  imports: [ValidationModal],
  templateUrl: './delete-page.html',
  styleUrl: './delete-page.scss',
})
export class DeletePage {

private readonly _animalService = inject(AnimalsService);
private readonly _route = inject(ActivatedRoute);
private readonly _router = inject(Router);

id :number = 1;
animal: AnimalsDetails | null = null;
data: string[]=[];
animalError: string | null = null;

async ngOnInit(): Promise<void> 
{
    this._route.params.subscribe(async params => {
      this.id = Number(params['id']);       

      await this.getAnimalDetailsById(this.id);    

      this.data = [this.animal!.name];

    });

  await this.getAnimalDetailsById(this.id);    

  this.data = [this.animal!.name];

}

async getAnimalDetailsById(id :number) {

      try {
        
        const response = await this._animalService.getAnimalDetailsById(id);
        this.animal = response;

        this.animalError = null;
  
      } catch (err) {
        console.error(err);
        this.animal = null;
        this.animalError = (err as ApiError).message;
      }

}

toConfirm(confirmation: boolean)
{

    if (confirmation)
    {
        this.deleteAnimalDefinitive();
    }
    else 
    {
      this._router.navigate(["/", "animals"]);
    }
}

deleteAnimalDefinitive() {

  this._animalService.deleteAnimal(this.id);
  this._router.navigate(["/", "animals"]);
}
}