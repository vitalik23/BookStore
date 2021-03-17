import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Constants } from '../constants/constants';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app-state.state';
import { RefreshToken } from '../components/account/store/actions/refresh-token.action';
import { AccountService } from '../service/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private store$: Store<AppState>,
    private accountService: AccountService,
    private jwtHelper: JwtHelperService,
  ) { }

  accessToken = this.accountService.getAccessToken();
  refreshToken = this.accountService.getRefreshToken();
  

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status == Constants.CODE_ERROR_UNAUTHORIZE) {
          this.store$.dispatch(new RefreshToken({
            accessToken: this.accessToken, 
            refreshToken: this.refreshToken
          }));
        }

        if (error.status == Constants.CODE_ERROR_FORBIDDEN_EROR) {
          alert(Constants.YOU_DONT_HAVE_ACCESS);
        }

        if(error.status == Constants.CODE_ERROR_BAD_REQUEST){
          let errorMessage = JSON.parse(JSON.stringify(`${error.error}`));
          alert(errorMessage);
        }

        if(error.status == Constants.CODE_ERROR_CONNECTION){
          alert(Constants.INTERNAL_SERVER_ERROR);
        }

        return throwError(error);
      })
    )
  }



}
