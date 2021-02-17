import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) {}
  baseUrl = environment.apiUrl;

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.baseUrl + 'PaymentsenseCodingChallenge/GetCountries');
  }

  public getCountry(countryName: string) {
    return this.httpClient.get<Country>(this.baseUrl + 'PaymentsenseCodingChallenge/GetCountries' + countryName);
  }
}
