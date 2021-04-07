import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../components/user/models/user.model';
import { ConstRoutes } from '../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  
  getUser(){
    return this.http.get<UserModel>(`${environment.apiUrl}${ConstRoutes.PROFILE}`);
  }

  updateUser(model: UserModel){
    return this.http.post<UserModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_USER}`, model);
  }

  getRole(){
    return this.http.get<string[]>(`${environment.apiUrl}${ConstRoutes.GET_ROLE}`)
  }
}
