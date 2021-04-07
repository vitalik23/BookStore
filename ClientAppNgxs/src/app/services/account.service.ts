import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfirmEmailModel } from '../components/account/models/confirm-email.model';
import { ForgotPasswordModel } from '../components/account/models/forgot-password.model';
import { LoginModel } from '../components/account/models/login.model';
import { RegisterModel } from '../components/account/models/register.model';
import { TokenModel } from '../components/account/models/token.model';
import { ConstRoutes } from '../constants/routes';
import { ConstShared } from '../constants/shared';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  signin(model: LoginModel): Observable<TokenModel>{
    return this.http.post<TokenModel>(`${environment.apiUrl}${ConstRoutes.SIGNIN}`, model);
  }

  signout(){
    return this.http.get(`${environment.apiUrl}${ConstRoutes.SIGNOUT}`);
  }

  getAccessToken(){
    return this.cookieService.get(ConstShared.ACCESS_TOKEN);
  }

  getRefreshToken(){
    return this.cookieService.get(ConstShared.REFRESH_TOKEN);
  }

  signup(model: RegisterModel): Observable<string>{
    return this.http.post<string>(`${environment.apiUrl}${ConstRoutes.SIGNUP}`, model);
  }

  updateTokens(token: TokenModel){
    return this.http.post<TokenModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_TOKENS}`, token);
  }

  confirmEmail(model: ConfirmEmailModel){
    return this.http.post(`${environment.apiUrl}${ConstRoutes.CONFIRMEMAIL}`, model);
  }

  forgotPassword(model: ForgotPasswordModel){
    return this.http.post<string>(`${environment.apiUrl}${ConstRoutes.FORGOT_PASSWORD}`, model);
  }
}
