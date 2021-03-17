import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AccountService } from 'src/app/service/account.service';
import * as refreshTokenAction from '../actions/refresh-token.action';
import { Constants } from 'src/app/constants/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RefreshTokenEffect {
    constructor
        (
            private accountService: AccountService,
            private actions$: Actions,
            private cookieService: CookieService
    ) { }

    @Effect()
    RefreshToken = this.actions$.pipe(
        ofType<refreshTokenAction.RefreshToken>(refreshTokenAction.RefreshTokenEnum.RefreshToken),
        mergeMap((action: refreshTokenAction.RefreshToken) =>
            this.accountService.updateTokens(action.payload).pipe(
                map((model) => {
                    return new refreshTokenAction.RefreshTokenSuccess(model);
                })
            ))
    );

    @Effect({ dispatch: false })
    RefreshTokenSuccess = this.actions$.pipe(
        ofType<refreshTokenAction.RefreshTokenSuccess>(refreshTokenAction.RefreshTokenEnum.RefreshTokenSuccess),
        map((action) => {
            this.cookieService.set(Constants.ACCESS_TOKEN, action.payload.accessToken, { path: '/' });
            this.cookieService.set(Constants.REFRESH_TOKEN, action.payload.refreshToken, { path: '/' });
        }
        )
    );

}
