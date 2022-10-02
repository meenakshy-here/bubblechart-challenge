import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ichart } from '../model/Ichart.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  url: string = "https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77";

  constructor(private _http: HttpClient) {}

  getChartData(): Observable<Ichart []> {
    return this._http.get<Ichart []>(this.url)
  }

}
