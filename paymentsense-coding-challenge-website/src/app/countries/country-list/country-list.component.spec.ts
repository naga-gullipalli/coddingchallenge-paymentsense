import { TestBed, async, ComponentFixture  } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatedResult, Pagination } from 'src/app/model/pagination';
import { CountryListComponent } from './country-list.component';
import { Country } from 'src/app/model/country';
import { of } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { UserParams } from 'src/app/model/userParams';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';







// let element: HTMLElement;
// let fixture: ComponentFixture<CountryListComponent>;

describe('CountryListComponent', () => {
    let component: CountryListComponent;
    let mockCountriesService;
    let paginatedResult: PaginatedResult<Country> = new PaginatedResult<Country>();
    let paginate;
    let country;
    let userParams = new UserParams();
    let fixture: ComponentFixture<CountryListComponent>;


    beforeEach(async(() => {
 
          
        paginate = 
        {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 11,
            totalPages: 2
        }


        country = [
            {  
                name: "uk", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"GBP", name: "pound", symbol: "£" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "us", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"USD", name: "dollar", symbol: "$" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "germany", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Franc", name: "euro", symbol: "£" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "India", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"India", name: "Rupee", symbol: "R" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "France", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"France", name: "euro", symbol: "£" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Canada", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Canada", name: "dollar", symbol: "$" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Australia", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Australia", name: "dollar", symbol: "$" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Srilanka", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Srilanka", name: "Rupee", symbol: "R" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Nepal", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Nepal", name: "Rupee", symbol: "R" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Japan", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Japan", name: "Yen", symbol: "Y" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "South Korea", flag: "https://restcountries.eu/data/col.svg", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"SouthKorea", name: "Yen", symbol: "Y" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            }
        ]
        paginatedResult.pagination = paginate;
        paginatedResult.result = country;

        mockCountriesService = jasmine.createSpyObj(['getCountries']);

        TestBed.configureTestingModule({
            imports: [
              RouterTestingModule.withRoutes([
              ]),
              FormsModule,
              FontAwesomeModule,
              PaginationModule.forRoot()
            ],
            declarations: [
              CountryListComponent
            ],
            providers: [
                { provide: CountriesService, useValue: mockCountriesService}
            ]
           // schemas:[NO_ERRORS_SCHEMA]
          }).compileComponents();
  
          fixture = TestBed.createComponent(CountryListComponent);
  
    }));

      describe('loadcountries', () => {
      it('should call the getCountries', () => {
          mockCountriesService.getCountries.and.returnValue(of(paginatedResult));
          fixture.detectChanges();
        
         expect(mockCountriesService.getCountries).toHaveBeenCalledWith(userParams);
      });
    });

});