import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalSex } from '@core/enums/animals-sex';
import { OwnerLabels, owners } from '@core/enums/owners.enum';
import { AnimalsDetails, AnimalSpecies, ApiError } from '@core/models';
import { AnimalsService } from '@core/services';

@Component({
  selector: 'app-modify-page',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-page.html',
  styleUrl: './modify-page.scss',
})
export class ModifyPage {

  private readonly _route = inject(ActivatedRoute);
  private readonly _animalService = inject(AnimalsService);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router); 
  protected AnimalSex = AnimalSex;
  public speciesList: AnimalSpecies[] = [];
  protected owners = owners;
  protected OwnerLabels = OwnerLabels;
  
  id! :number;
  animal: AnimalsDetails | null = null;
  age :string = Date();
  //description :string | undefined;
  animalError: string | null = null;

  sexOptions = Object.values(AnimalSex)
  .filter((v): v is number => typeof v === 'number')
  .map(v => ({ value: v, label: AnimalSex[v] as string }));

  ownerOptions = Object.values(owners)
  .filter((v): v is number => typeof v === 'number')
  .map(v => ({ value: v, label: owners[v] as string }));

  registerError :string = '';
  name = new FormControl('', [Validators.required]);
  sexId = new FormControl<number | null>(null, [Validators.required]);
  speciesName = new FormControl('', [Validators.required]);
  ownerId = new FormControl<number |null>(null!, [Validators.required]);
  isAvailable = new FormControl(false, {
    nonNullable: true,
    validators: [Validators.required],
  });
  birthDate = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  ripDate = new FormControl<string | null>('', {
    nonNullable: true,
  });

    modifyForm = this._fb.group({
    name: this.name,
    sexId: this.sexId,
    speciesName: this.speciesName,
    ownerId: this.ownerId,
    isAvailable: this.isAvailable,
    birthDate: this.birthDate,
    ripDate: this.ripDate,
  });

  modifyError = '';

  ngOnInit() {
    this.loadSpecies();

    this._route.params.subscribe(async params => {
      this.id = Number(params['id']);       

      await this.getAnimalDetailsById(this.id);    

      if (!this.animal) return;

      console.log('API ownerId:', this.animal!.ownerId, typeof this.animal!.ownerId);
      console.log('API sexId:', this.animal!.sexId, typeof this.animal!.sexId);

      this.modifyForm.patchValue({
        name: this.animal.name,
        sexId: Number(this.animal.sexId),
        speciesName: this.animal.speciesName,
        ownerId: Number(this.animal.ownerId),
        isAvailable: this.animal.isAvailable,
        birthDate: this.animal.birthDate?.substring(0, 10),
        ripDate: this.animal.ripDate ? this.animal.ripDate.substring(0, 10) : null,
      });
    });
  }

  async getAnimalDetailsById(id :number) :Promise<void> {

    try {
      
      const response = await this._animalService.getAnimalDetailsById(id);
      this.animal = response;
      console.log(response);
      //this.age = this._animalsService.getAge(this.animal.birthDate);

      const speciesList = await this._animalService.getAnimalSpecies();
      const species = speciesList.find(s => s.name === response.speciesName);

      //this.description = species?.description;

      
      
      this.animalError = null;

    } catch (err) {
      console.error(err);
      this.animal = null;
      this.animalError = (err as ApiError).message;
    }

  }

  ///////////////////


  async onSubmit() {

    if (this.modifyForm.valid) {
      const v = this.modifyForm.value;

      const payload = {
        Name: v.name!,
        Sex: Number(v.sexId),               
        SpeciesName: v.speciesName!,
        OwnerId: Number(v.ownerId),   
        BirthDate: new Date(v.birthDate!).toISOString(),
        RIPDate: v.ripDate ? new Date(v.ripDate).toISOString() : null,
        IsAvailable: v.isAvailable!,       
      };

      console.log(payload);

      await this._animalService.modifyAnimal(this.id, payload as any);
      this._router.navigate(['/animals']);
              
  };

    }
  

  private async loadSpecies() {
  try {
    this.speciesList = await this._animalService.getAnimalSpecies();
  } catch (err) {
    console.error('Erreur chargement espèces', err);
  }

}
}
