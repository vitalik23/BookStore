import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageQuery } from 'src/app/models/page/page-query.model';
import { PageResponse } from 'src/app/models/page/page-response.model';
import { environment } from 'src/environments/environment';
import { AuthorFilter } from '../components/author/models/author-filter.model';
import { AuthorModel } from '../components/author/models/author.model';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient,
    private router: Router
  )
  { }

    addAuthor(model: AuthorModel): Observable<AuthorModel>{
      return this.http.post<AuthorModel>(`${environment.apiUrl}${Constants.CREATE_AUTHOR}`, model);
    }

    getAuthors(PaginationFilterModels: PageQuery, AuthorFilterModels: AuthorFilter): Observable<PageResponse>{    
      return this.http.post<PageResponse>(`${environment.apiUrl}${Constants.GET_AUTHORS}`, { PaginationFilterModels,  AuthorFilterModels});
    }

    getAuthor(id: number){
      return this.http.get(`${environment.apiUrl}${Constants.GET_AUTHOR}${id}`);
    }

    updateAuthor(model: AuthorModel): Observable<AuthorModel>{
      return this.http.put<AuthorModel>(`${environment.apiUrl}${Constants.UPDATE_AUTHOR}`, model)
    }

    deleteAuthor(id: number){
      return this.http.get(`${environment.apiUrl}${Constants.DELETE_AUTHOR}${id}`);
    }

}
