import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/model/country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: Country[];
  constructor(private countryService: CountriesService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    })
  }

}
