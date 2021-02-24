import { TestBed, async, ComponentFixture  } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatedResult, Pagination } from 'src/app/model/pagination';
import { CountryListComponent } from './country-list.component';
import { Country } from 'src/app/model/country';
import { of } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { UserParams } from 'src/app/model/userParams';



// let element: HTMLElement;
// let fixture: ComponentFixture<CountryListComponent>;

describe('CountryListComponent', () => {
    let component: CountryListComponent;
    let mockCountriesService;
    let paginatedResult: PaginatedResult<Country> = new PaginatedResult<Country>();
    let paginate;
    let Country;
    let userParams = new UserParams();

    beforeEach(async(() => {
        paginate = 
        {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 11,
            totalPages: 2
        }


        Country = [
            {  
                name: "uk", flag: "uk flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"GBP", name: "pound", symbol: "£" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "us", flag: "us flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"USD", name: "dollar", symbol: "$" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "germany", flag: "ger flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Franc", name: "euro", symbol: "£" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "India", flag: "India flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"India", name: "Rupee", symbol: "R" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "France", flag: "France flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"France", name: "euro", symbol: "£" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Canada", flag: "Canada flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Canada", name: "dollar", symbol: "$" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Australia", flag: "Australia flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Australia", name: "dollar", symbol: "$" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Srilanka", flag: "Srilanka flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Srilanka", name: "Rupee", symbol: "R" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Nepal", flag: "Nepal flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Nepal", name: "Rupee", symbol: "R" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "Japan", flag: "Japan flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"Japan", name: "Yen", symbol: "Y" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            },
            {  
                name: "South Korea", flag: "South Korea flag", population: 1234, capital: "london", timezones: ["GMT+1", "GMT-1"], currencies: [ { code:"SouthKorea", name: "Yen", symbol: "Y" }],
                languages: [{ iso639_1: "iso6391", iso639_2: "iso6392", name: "isoname", nativeName: "isonativename" }], 
                borders: ["border 1", "border 2"]
            }
        ]
        paginatedResult.pagination = paginate;
        paginatedResult.result = Country;

        mockCountriesService = jasmine.createSpyObj(['getCountries'])
       
        component = new CountryListComponent(mockCountriesService);

      }));

      describe('loadcountries', () => {
      it('should call the getCountries', () => {
          mockCountriesService.getCountries.and.returnValue(of(paginatedResult));
          component.loadCountries();
        
         expect(mockCountriesService.getCountries).toHaveBeenCalledWith(userParams);
      });
    });

});