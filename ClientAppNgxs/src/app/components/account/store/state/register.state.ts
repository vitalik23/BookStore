import { State, Action, StateContext, Selector  } from '@ngxs/store';
import { AccountService } from 'src/app/services/account.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Register } from '../actions/register.action';


export class RegisterStateModel {
    message: string;
}

@State<RegisterStateModel>({
    name: 'register',
    defaults: {
        message: null
    }
})

@Injectable()
export class RegisterState {
    constructor(
        private _accountService: AccountService,
    ) {

    }

    @Selector()
    static getMessage(state: RegisterStateModel) {
        return state.message;
    }

    @Action(Register)
    register({ getState, setState }: StateContext<RegisterStateModel>, { payload }: Register) {
        return this._accountService.signup(payload).pipe(
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
