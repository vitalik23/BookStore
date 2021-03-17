import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModule } from '../components/user/user.module';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  
  profile(){
    return this.http.get(`${environment.apiUrl}${Constants.PROFILE}`);
  }

  updateUser(model: UserModule): Observable<UserModule>{
    return this.http.post<UserModule>(`${environment.apiUrl}${Constants.UPDATE_USER}`, model);
  }

}
