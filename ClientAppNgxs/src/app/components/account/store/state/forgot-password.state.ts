import { State, Action, StateContext, Selector  } from '@ngxs/store';
import { AccountService } from 'src/app/services/account.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ForgotPassword } from '../actions/forgot-password.action';


export class ForgotPasswordStateModel {
    message: string;
}

@State<ForgotPasswordStateModel>({
    name: 'forgotPassword',
    defaults: {
        message: null
    }
})

@Injectable()
export class ForgotPasswordState {
    constructor(
        private _accountService: AccountService,
    ) {

    }

    @Selector()
    static getMessage(state: ForgotPasswordStateModel) {
        return state.message;
    }

    @Action(ForgotPassword)
    forgotPassword({ getState, setState }: StateContext<ForgotPasswordStateModel>, { payload }: ForgotPassword) {
        return this._accountService.forgotPassword(payload).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    message: result
                });
            }
        ));
    }

}
