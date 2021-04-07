import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConstRoutes } from '../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionService {

  constructor(
    private http: HttpClient
  ) { }

  getMaxPricePrintingEdition(){
    return this.http.post<number>(`${environment.apiUrl}${ConstRoutes.GET_MAX_PRICE_PRINTING_EDITION}`, null);
  }
}
