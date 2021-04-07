import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token.model';
import { environment } from 'src/environments/environment';
import { ConfirmEmailModel } from '../components/account/models/confirm-email.model';
import { ForgotPasswordModel } from '../components/account/models/forgot-password.model';
import { Login } from '../components/account/models/login.model';
import { RegisterModel } from '../components/account/models/register.model';
import { Constants } from '../constants/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) { }

  signin(model: Login): Observable<Token>{
    return this.http.post<Token>(`${environment.apiUrl}${Constants.SIGNIN}`, model);
  }

  signup(model: RegisterModel): Observable<string>{
    return this.http.post<string>(`${environment.apiUrl}${Constants.SIGNUP}`, model);
  }

  confirmEmail(model: ConfirmEmailModel){
    return this.http.post(`${environment.apiUrl}${Constants.CONFIRMEMAIL}`, model);
  }

  forgotPassword(model: ForgotPasswordModel): Observable<ForgotPasswordModel>{
    return this.http.post<ForgotPasswordModel>(`${environment.apiUrl}${Constants.FORGOT_PASSWORD}`, model);
  }

  updateTokens(token: Token): Observable<Token>{
    return this.http.post<Token>(`${environment.apiUrl}${Constants.UPDATE_TOKENS}`, token);
  }

  getAccessToken(){
    return this.cookieService.get(Constants.ACCESS_TOKEN);
  }

  getRefreshToken(){
    return this.cookieService.get(Constants.REFRESH_TOKEN);
  }
}
