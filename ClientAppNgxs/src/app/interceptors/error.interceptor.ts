import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ConstError } from "../constants/error";
import { AccountService } from "../services/account.service";
import * as alertify from 'alertifyjs';
import { RefreshToken } from "../components/account/store/actions/auth.action";

@Injectable({
    providedIn: 'root'
  })
  export class ErrorInterceptorService implements HttpInterceptor {
  
    constructor(
      private store$: Store,
      private accountService: AccountService,
    ) { }
  
    accessToken = this.accountService.getAccessToken();
    refreshToken = this.accountService.getRefreshToken();
    
    errors = [];
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError((error) => {
          if (error.status == ConstError.CODE_ERROR_UNAUTHORIZE) {
            this.store$.dispatch(new RefreshToken({
              accessToken: this.accessToken, 
              refreshToken: this.refreshToken
            }));
          }
  
          if (error.status == ConstError.CODE_ERROR_FORBIDDEN_EROR) {
            alertify.error(ConstError.YOU_DONT_HAVE_ACCESS);
          }
  
          if(error.status == ConstError.CODE_ERROR_BAD_REQUEST){
            let errors = this.handleBadRequest(error);
            alertify.error(errors.toString());
          }
  
          if(error.status == ConstError.CODE_ERROR_CONNECTION){
            alertify.error(ConstError.INTERNAL_SERVER_ERROR);
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