import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) {}
  baseUrl = environment.apiUrl + 'api/v1/';
  countries: Country[] = [];

  public getCountries(): Observable<Country[]> {
    if(this.countries.length >0) return of(this.countries);
    return this.httpClient.get<Country[]>(this.baseUrl + 'PaymentsenseCodingChallenge/GetCountries').pipe(
      map(countries => {
        this.countries = countries;
        return countries;
      }),
      catchError(this.handleError)
    );
  }

  public getCountry(countryName: string) {
    const country = this.countries.find(x => x.name === countryName);
    if(country !== undefined) return of(country);
    return this.httpClient.get<Country>(this.baseUrl + 'PaymentsenseCodingChallenge/GetCountrybyName/' + countryName);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    //TODO: to be logged 
    //console.error(errorMessage);
    return throwError(errorMessage);
  }
}
