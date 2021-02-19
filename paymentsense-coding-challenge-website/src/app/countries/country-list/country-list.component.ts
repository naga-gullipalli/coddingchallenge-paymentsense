import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/model/country';
import { Pagination } from 'src/app/model/pagination';
import { UserParams } from 'src/app/model/userParams';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: Country[];
  pagination: Pagination;
  userParams: UserParams;

  constructor(private countryService: CountriesService) { 
    this.userParams = new UserParams();
  }

  ngOnInit() {
   this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries(this.userParams).subscribe(response => {
      this.countries = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.loadCountries();
  }

}
