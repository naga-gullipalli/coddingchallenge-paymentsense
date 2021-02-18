import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/model/country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries$: Observable<Country[]>;
  constructor(private countryService: CountriesService) { }

  ngOnInit() {
    this.countries$ = this.countryService.getCountries();
  }

}
