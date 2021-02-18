import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/model/country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  errorMessage = '';
  country: Country;
  constructor(private countryService: CountriesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCountry();
  }

  loadCountry(){
    this.countryService.getCountry(this.route.snapshot.paramMap.get('countryname')).subscribe(
      country => {
        this.country = country; },
        error => this.errorMessage = <any>error
    );
  }

}
