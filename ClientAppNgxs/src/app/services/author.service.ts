import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthorFilterModel } from '../components/author/models/author-filter.model';
import { AuthorModel } from '../components/author/models/author.model';
import { ConstRoutes } from '../constants/routes';
import { PageQuery } from '../models/page-query';
import { PageResponse } from '../models/page-responce';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient,
  ) { }

  addAuthor(model: AuthorModel){
    return this.http.post<AuthorModel>(`${environment.apiUrl}${ConstRoutes.CREATE_AUTHOR}`, model);
  }

  getAuthors(PaginationFilterModels: PageQuery, AuthorFilterModels: AuthorFilterModel){    
    return this.http.post<PageResponse>(`${environment.apiUrl}${ConstRoutes.GET_AUTHORS}`, { PaginationFilterModels,  AuthorFilterModels});
  }

  getAuthor(id: number){
    return this.http.get(`${environment.apiUrl}${ConstRoutes.GET_AUTHOR}${id}`);
  }

  updateAuthor(model: AuthorModel){
    return this.http.put<AuthorModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_AUTHOR}`, model)
  }

  deleteAuthor(id: number){
    return this.http.get(`${environment.apiUrl}${ConstRoutes.DELETE_AUTHOR}${id}`);
  }
}
