import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Constants } from '../constants/constants';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app-state.state';
import { RefreshToken } from '../components/account/store/actions/refresh-token.action';
import { AccountService } from '../service/account.service';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private store$: Store<AppState>,
    private accountService: AccountService,
  ) { }

  accessToken = this.accountService.getAccessToken();
  refreshToken = this.accountService.getRefreshToken();
  
  errors = [];

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
          alertify.error(Constants.YOU_DONT_HAVE_ACCESS);
        }

        if(error.status == Constants.CODE_ERROR_BAD_REQUEST){
          let errors = this.handleBadRequest(error);
          alertify.error(errors.toString());
        }

        if(error.status == Constants.CODE_ERROR_CONNECTION){
          alertify.error(Constants.INTERNAL_SERVER_ERROR);
        }

        return throwError(error);
      })
    )
  }

  private handleBadRequest(error: HttpErrorResponse): string {

    if(error.error.errors != null){
      let errorMessage = '';
      const values = Object.values(error.error.errors);
      values.map((message: string) => {
        errorMessage += message + '\n';
      })

      return errorMessage;

    }
    return error.error ? error.error : error.message;
  }


}
