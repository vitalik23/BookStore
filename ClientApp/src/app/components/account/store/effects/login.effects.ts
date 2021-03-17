import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as loginActions from '../actions/login.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AccountService } from '../../../../service/account.service';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { GetError } from 'src/app/store/actions/base-error.action';
import { Constants } from 'src/app/constants/constants';
import { CookieService } from 'ngx-cookie-service';



@Injectable()
export class LoginEffects {

    constructor(
        private actions$: Actions,
        private accountService: AccountService,
        private cookieService: CookieService
    ) { }

    @Effect()
    LogIn: Observable<Action> = this.actions$.pipe(
        ofType<loginActions.LogIn>(loginActions.LoginActionsEnum.LogIn),
        mergeMap((model: loginActions.LogIn) =>
            this.accountService.signin(model.payload).pipe(
                map((loginSuccessModel: any) => {
                    loginSuccessModel.rememberMe = model.payload.rememberMe;
                    return new loginActions.LoginSuccess(loginSuccessModel);
                }),
                catchError((errorMessage) => {
                    let error = JSON.parse(JSON.stringify(`${errorMessage.error}`));
                    if (error === Constants.UNDEFINED) {
                        error = Constants.INTERNAL_SERVER_ERROR;
                    }
                    return of(new GetError(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    RememberMe = this.actions$.pipe(
        ofType<loginActions.LoginSuccess>(loginActions.LoginActionsEnum.LoginSuccess),
        map((action) => {
            this.cookieService.set(Constants.ACCESS_TOKEN, action.payload.accessToken, { path: '/' });
            if (action.payload.rememberMe === true) {
                this.cookieService.set(Constants.REFRESH_TOKEN, action.payload.refreshToken, { path: '/' });
            }

            window.location.href = Constants.ROUTE_MAIN_PAGE;

        })
    );

    @Effect({dispatch: false})
    Logout = this.actions$.pipe(
        ofType<loginActions.Logout>(loginActions.LoginActionsEnum.Logout),
        tap(_ =>{
            this.cookieService.delete(Constants.ACCESS_TOKEN, '/');
            this.cookieService.delete(Constants.REFRESH_TOKEN, '/');
            window.location.href = Constants.ROUTE_MAIN_PAGE;

        })
    );
}
