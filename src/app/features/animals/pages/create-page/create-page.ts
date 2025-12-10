import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalsService } from '@core/services/animals.service';
import { AnimalSex } from '@core/enums/animals-sex';
import { owners } from '@core/enums/owners.enum';
import { KeyValuePipe } from '@angular/common';
import { AnimalSpecies } from '@core/models/animalspecies.model';

@Component({
  selector: 'app-create-page',
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './create-page.html',
  styleUrl: './create-page.scss',
})
export class CreatePage {

  private readonly _fb = inject(FormBuilder);
  private readonly _animalService = inject(AnimalsService);
  private readonly _router = inject(Router); 

  registerError :string = '';

  
  protected AnimalSex = AnimalSex;
  public speciesList: AnimalSpecies[] = [];
  protected owners = owners;

  constructor() {
    this.loadSpecies();
  }

  name = new FormControl('', [Validators.required]);
  sex = new FormControl<AnimalSex>(null!, [Validators.required]);
  speciesName = new FormControl('', [Validators.required]);
  ownerName = new FormControl<owners>(null!, [Validators.required]);
  isAvailable = new FormControl(false, {
    nonNullable: true,
    validators: [Validators.required],
  });
  birthDate = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  ripDate = new FormControl<string>('', {
    nonNullable: true,
  });

  createForm = this._fb.group({
    name: this.name,
    sex: this.sex,
    speciesName: this.speciesName,
    ownerName: this.ownerName,
    isAvailable: this.isAvailable,
    birthDate: this.birthDate,
    ripDate: this.ripDate,
  });

  createError = '';
// créer le model animal form dto sans l'age et la description
  onSubmit() {
    if (this.createForm.valid) {
      this._animalService
        .createAnimal({
          name: this.createForm.value.name!,
          sex: this.createForm.value.sex!,
          speciesName: this.createForm.value.speciesName!,
          ownerName: this.createForm.value.ownerName!,
          isAvailable: this.createForm.value.isAvailable!,
          birthDate: this.createForm.value.birthDate!,
          ripDate: this.createForm.value.ripDate!,
          age: null,
          description: null,
        })
        .then(() => {
          this._router.navigate(['/animals']);
        })
        .catch((err) => {
          console.error(err);
          this.registerError = err.message;
        });
    }
  }

  private async loadSpecies() {
  try {
    this.speciesList = await this._animalService.getAnimalSpecies();
  } catch (err) {
    console.error('Erreur chargement espèces', err);
  }
}
}
