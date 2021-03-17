import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageQuery } from 'src/app/models/page/page-query.model';
import { PageResponse } from 'src/app/models/page/page-response.model';
import { environment } from 'src/environments/environment';
import { AuthorModel } from '../components/author/models/author.model';
import { PrintingEdition } from '../components/printing-edition/models/printing-edition.model';
import { UserProfile } from '../components/user/models/user-profile.model';
import { PrintingEditionFilterModel } from '../components/admin/models/printing-edition-filter.model';
import { UserFilter } from '../components/admin/models/user-filter.model';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor
  (
    private http: HttpClient,
  )
  { }

  getClients(PaginationFilterModel: PageQuery, UserFilterModels: UserFilter): Observable<PageResponse>{
    return this.http.post<PageResponse>(`${environment.apiUrl}${Constants.GET_USERS}`, { PaginationFilterModel, UserFilterModels });
  }

  getPrintingsEdition(PaginationFilterModels: PageQuery, PrintingEditionFilterModels: PrintingEditionFilterModel): Observable<PageResponse>{
    return this.http.post<PageResponse>(`${environment.apiUrl}${Constants.GET_PRINTING_EDITIONS}`, { PaginationFilterModels, PrintingEditionFilterModels });
  }

  deleteUser(id: number){
    return this.http.get(`${environment.apiUrl}${Constants.DELETE_USER}${id}`);
  }

  blockUser(id: number){
    return this.http.get(`${environment.apiUrl}${Constants.BLOCK_USER}${id}`);
  }


  updateUser(model: UserProfile){
    return this.http.post<UserProfile>(`${environment.apiUrl}${Constants.UPDATE_USER_FOR_ADMIN}`, model);
  }

  deletePrintingEdition(id: number){
    return this.http.get(`${environment.apiUrl}${Constants.DELETE_PRINTING_EDITION}${id}`);
  }

  updatePrintingEdition(model: PrintingEdition): Observable<PrintingEdition>{
    return this.http.put<PrintingEdition>(`${environment.apiUrl}${Constants.UPDATE_PRINTING_EDITION}`, model );
  }
  
  listAuthors(){
    return this.http.get<AuthorModel[]>(`${environment.apiUrl}${Constants.GET_ALL_AUTHORS}`);
  }

  addPrintingEdition(model: PrintingEdition): Observable<PrintingEdition>{
    return this.http.post<PrintingEdition>(`${environment.apiUrl}${Constants.CREATE_PRINTING_EDITION}`, model)
  }

  getPrintingEdition(id: number){
    return this.http.get(`${environment.apiUrl}${Constants.GET_PRINTING_EDITION}${id}`);
  }

}

