import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimalsListing } from '@core/models/animals-listing.model';
import { ApiError } from '@core/models/api-error.model';
import { AnimalsService } from '@core/services/animals.service';

@Component({
  selector: 'app-animals-listing-page',
  imports: [JsonPipe, RouterModule],
  templateUrl: './animals-listing-page.html',
  styleUrl: './animals-listing-page.scss',
})
export class AnimalsListingPage implements OnInit {

  private readonly _animalsService = inject(AnimalsService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  animals: AnimalsListing[] | null = null;
  animalsError: string | null = null;

  id :number = 1;
  page :number = 1;
  pageSize :number = 5;
  pageSizeOptions :number[] = [5,10,25,50];
  wrongsizePage :boolean = false;

  ngOnInit(): void {

    const qp = this._route.snapshot.queryParams;
    this.page = Number(qp['page']) || 1;
    this.pageSize = Number(qp['pageSize']) || 5;

    this.getAnimals();
  }

  async getAnimals(): Promise<void> {

    

    try {
      
      const response = await this._animalsService.getAnimals(this.page - 1, this.pageSize);
      
 
      if (response.length !== this.pageSize) {
        console.warn("Le backend ne renvoie pas le bon nombre !");
        this.wrongsizePage = true;
      } 
      else 
      {
        this.wrongsizePage = false;
      }



      this.animals = response;
      this.animalsError = null;
    } catch (err) {
      console.error(err);
      this.animals = null;
      this.animalsError = (err as ApiError).message;
    }
  }

  
  goToPage(page: number): void {
    if (page < 1) return;

    this.page = page;
    this.getAnimals();

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: this.page,
        pageSize: this.pageSize,
      },

    });
  }

 
  changePageSize(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (!value) return;

    this.pageSize = value;
    this.page = 1;  
    this.getAnimals();

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: this.page,
        pageSize: this.pageSize,
      },
    });
  }

  async createAnimal() :Promise<void> {
    
  }
}
