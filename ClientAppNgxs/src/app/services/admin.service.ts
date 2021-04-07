import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrintingEditionFilterModel } from '../components/admin/models/printing-edition.model';
import { UserFilterModel } from '../components/admin/models/user-filter.model';
import { AuthorModel } from '../components/author/models/author.model';
import { PrintingEditionModel } from '../components/printing-edition/models/printing-edition.model';
import { UserModel } from '../components/user/models/user.model';
import { ConstRoutes } from '../constants/routes';
import { PageQuery } from '../models/page-query';
import { PageResponse } from '../models/page-responce';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) { }

  
  getClients(PaginationFilterModel: PageQuery, UserFilterModels: UserFilterModel){
    return this.http.post<PageResponse>(`${environment.apiUrl}${ConstRoutes.GET_USERS}`, { PaginationFilterModel, UserFilterModels });
  }

  getPrintingsEdition(PaginationFilterModels: PageQuery, PrintingEditionFilterModels: PrintingEditionFilterModel){
    return this.http.post<PageResponse>(`${environment.apiUrl}${ConstRoutes.GET_PRINTING_EDITIONS}`, { PaginationFilterModels, PrintingEditionFilterModels });
  }

  deleteUser(id: number){
    return this.http.get(`${environment.apiUrl}${ConstRoutes.DELETE_USER}${id}`);
  }

  blockUser(id: number){
    return this.http.get(`${environment.apiUrl}${ConstRoutes.BLOCK_USER}${id}`);
  }

  updateUser(model: UserModel){
    return this.http.post<UserModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_USER_FOR_ADMIN}`, model);
  }

  deletePrintingEdition(id: number){
    return this.http.get(`${environment.apiUrl}${ConstRoutes.DELETE_PRINTING_EDITION}${id}`);
  }

  updatePrintingEdition(model: PrintingEditionModel){
    return this.http.put<PrintingEditionModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_PRINTING_EDITION}`, model );
  }
  
  listAuthors(){
    return this.http.get<AuthorModel[]>(`${environment.apiUrl}${ConstRoutes.GET_ALL_AUTHORS}`);
  }

  addPrintingEdition(model: PrintingEditionModel){
    return this.http.post<PrintingEditionModel>(`${environment.apiUrl}${ConstRoutes.CREATE_PRINTING_EDITION}`, model)
  }

  getPrintingEdition(id: number){
    return this.http.get<PrintingEditionModel>(`${environment.apiUrl}${ConstRoutes.GET_PRINTING_EDITION}${id}`);
  }

}
