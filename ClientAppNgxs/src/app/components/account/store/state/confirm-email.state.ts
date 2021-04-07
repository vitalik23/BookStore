import { State, Action, StateContext  } from '@ngxs/store';
import { AccountService } from 'src/app/services/account.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ConfirmEmail } from '../actions/confirm-email.action';


export class ConfirmEmailStateModel {
}

@State<ConfirmEmailStateModel>({
    name: 'confirmEmail',
    defaults: {
    }
})

@Injectable()
export class ConfirmEmailState {
    constructor(
        private _accountService: AccountService,
    ) {

    }

    @Action(ConfirmEmail)
    forgotPassword(_: StateContext<ConfirmEmailStateModel>, { payload }: ConfirmEmail) {
        return this._accountService.confirmEmail(payload).pipe(
            tap(() => {
            })
        )
    }

}
