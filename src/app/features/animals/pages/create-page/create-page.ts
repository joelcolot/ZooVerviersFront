import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalsService } from '@core/services/animals.service';
import { KeyValuePipe } from '@angular/common';
import { AnimalSpecies } from '@core/models';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimalSex, owners, OwnerLabels } from '@core/enums';
import dayjs from 'dayjs';

@Component({
  selector: 'app-create-page',
  imports: [ReactiveFormsModule, KeyValuePipe, TranslatePipe],
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
  protected OwnerLabels = OwnerLabels;
  charCount :number = 0;

  sexOptions = Object.values(AnimalSex)
  .filter((v): v is number => typeof v === 'number')
  .map(v => ({ value: v, label: AnimalSex[v] as string }));

  ownerOptions = Object.values(owners)
  .filter((v): v is number => typeof v === 'number')
  .map(v => ({ value: v, label: owners[v] as string }));

  constructor() {
    this.loadSpecies();
  }

  name = new FormControl('', [Validators.required]);
  sex = new FormControl(0, [Validators.required]);
  speciesName = new FormControl('', [Validators.required]);
  ownerId = new FormControl<owners>(null!, [Validators.required]);
  isAvailable = new FormControl(false, {
    nonNullable: true,
    validators: [Validators.required],
  });
  birthDate = new FormControl<string>(dayjs().format('YYYY-MM-DD'), {
    nonNullable: true,
    validators: [Validators.required],
  });
  ripDate = new FormControl<string>('', {
    nonNullable: true,
  });
  description = new FormControl('', [Validators.maxLength(1000)]);

  createForm = this._fb.group({
    name: this.name,
    sex: this.sex,
    speciesName: this.speciesName,
    ownerId: this.ownerId,
    isAvailable: this.isAvailable,
    birthDate: this.birthDate,
    ripDate: this.ripDate,
    description: this.description,
  });

  createError = '';

  onSubmit() {

    if (this.createForm.valid) {
      const v = this.createForm.value;

      const payload = {
        Name: v.name!,
        Sex: Number(v.sex),
        SpeciesName: v.speciesName!,
        OwnerId: Number(v.ownerId), 
        BirthDate: new Date(v.birthDate!).toISOString(),
        RIPDate: v.ripDate ? new Date(v.ripDate).toISOString() : null,
        IsAvailable: v.isAvailable!,
        Description: v.description,
      };

      this._animalService.createAnimal(payload as any);
    }
  }

  private async loadSpecies() {
  try {
    this.speciesList = await this._animalService.getAnimalSpecies();
  } catch (err) {
    console.error('Erreur chargement espèces', err);
  }
}

updateCount() {
  const value = this.createForm.get('description')?.value || '';
  this.charCount = value.length;
}
}


