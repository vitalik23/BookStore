import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { AccountService } from 'src/app/services/account.service';
import { RefreshToken, SignIn, SignOut } from '../actions/auth.action';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConstShared } from 'src/app/constants/shared';
import { Router } from '@angular/router';


export class AuthStateModel {
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
    }
})

@Injectable()
export class AuthState {
    constructor(
        private _accountService: AccountService,
        private _cookieService: CookieService,
    ) {

    }


    @Action(SignIn)
    signIn(_: StateContext<AuthStateModel>, { payload }: SignIn) {
        return this._accountService.signin(payload).pipe(
            tap((result) => {   
                
                if (payload.rememberMe) {
                    this._cookieService.set(ConstShared.REFRESH_TOKEN, result.refreshToken, { path: '/' });
                }

                this._cookieService.set(ConstShared.ACCESS_TOKEN, result.accessToken, { path: '/' });
            }
            
        ));
    }

    @Action(SignOut)
    signOut(_: StateContext<AuthStateModel>) {
        return this._accountService.signout().pipe(
            tap(() => {
                this._cookieService.delete(ConstShared.ACCESS_TOKEN, '/');
                this._cookieService.delete(ConstShared.REFRESH_TOKEN, '/');
                location.href = "/";
            }
        ));
    }

    @Action(RefreshToken)
    refreshToken(_: StateContext<AuthStateModel>, { payload }: RefreshToken){
        return this._accountService.updateTokens(payload).pipe(
            tap((result) => {
                this._cookieService.set(ConstShared.REFRESH_TOKEN, result.refreshToken, { path: '/' });
                this._cookieService.set(ConstShared.ACCESS_TOKEN, result.accessToken, { path: '/' });
            })
        );
    }


}
