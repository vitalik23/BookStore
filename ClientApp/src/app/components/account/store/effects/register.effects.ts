import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GetError } from 'src/app/store/actions/base-error.action';
import { AccountService } from '../../../../service/account.service';
import * as registerAction from '../actions/register.actions';
import { Constants } from 'src/app/constants/constants';


@Injectable()
export class RegisterEffect{

    constructor(
        private action$: Actions,
        private accountService: AccountService,
    ){}

    @Effect()
    Register: Observable<Action> = this.action$.pipe(
        ofType<registerAction.Register>(registerAction.RegisterActionsEnum.Register),
        mergeMap((model: registerAction.Register) =>
            this.accountService.signup(model.payload).pipe(
                map((message) => {
                    return new registerAction.RegisterSuccess(message);
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

}
