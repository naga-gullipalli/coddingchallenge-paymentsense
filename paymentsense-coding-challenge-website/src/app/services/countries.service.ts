import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';
import { PaginatedResult } from '../model/pagination';
import { UserParams } from '../model/userParams';




@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) {}
  baseUrl = environment.apiUrl + 'api/v1/';
  countries: Country[] = [];
  countryCache = new Map();

  public getCountries(userParams: UserParams) {
    var response = this.countryCache.get(Object.values(userParams).join('-'));
    if(response){
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize)

    return this.getPaginatedResult<Country[]>(this.baseUrl + 'PaymentsenseCodingChallenge/GetCountries', params).
    pipe(
      map(response => {
        this.countryCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    )
  }

  

  public getCountry(countryName: string) {
    const country = [...this.countryCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((country: Country) => country.name === countryName);

    if(country){
      return of(country);
    }

     return this.httpClient.get<Country>(this.baseUrl + 'PaymentsenseCodingChallenge/GetCountrybyName/' + countryName);
  }


  private getPaginatedResult<T>(url, params) {
    const  paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.httpClient.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }),
      catchError(this.handleError)
    );
  }

  private getPaginationHeaders(pageNumber?: number, pageSize?: number)
  {
      let params = new HttpParams();

      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
      return params;
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
