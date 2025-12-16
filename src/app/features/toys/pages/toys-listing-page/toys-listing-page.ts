import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Spinner } from "@components/animation/spinner/spinner";
import { ApiError } from '@core/models';
import { ToysListing } from '@core/models/toys/toys-listing.model';
import { ToysService } from '@core/services/toys.service';

@Component({
  selector: 'app-toys-listing-page',
  imports: [Spinner, RouterModule],
  templateUrl: './toys-listing-page.html',
  styleUrl: './toys-listing-page.scss',
})
export class ToysListingPage implements OnInit{

  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _toysService = inject(ToysService);

toys: ToysListing[] | null = null;
toysError: string | null = null;



id :number = 1;
page :number = 1;
pageSize :number = 5;
pageSizeOptions :number[] = [5,10,25,50];
hasNextPage :boolean = false;

ngOnInit(): void {

  const qp = this._route.snapshot.queryParams;
    this.page = Number(qp['page']) || 1;
    this.pageSize = Number(qp['pageSize']) || 5;

  this.getToys();
}

async getToys(): Promise<void> {

  

  try {
    

    const current = await this._toysService.getToys(this.page - 1, this.pageSize);
    this.toys = current;

    const next = await this._toysService.getToys(this.page, this.pageSize);
    this.hasNextPage = next.length > 0;
    

    this.toysError = null;
  } catch (err) {
    console.error(err);
    this.toys = null;
    this.toysError = (err as ApiError).message;
  }
}

goToPage(page: number) {
    if (page < 1) return;

    this.page = page;
    this.getToys();

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: this.page,
        pageSize: this.pageSize,
      },

    });
}

changePageSize(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    if (!value) return;

    this.pageSize = value;
    this.page = 1;  
    this.getToys();

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: this.page,
        pageSize: this.pageSize,
      },
    });
}

}
