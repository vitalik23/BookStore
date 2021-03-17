import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap} from 'rxjs/operators';
import { GetError } from 'src/app/store/actions/base-error.action';
import { ForgotPasswordModel } from '../../models/forgot-password.model';
import { AccountService } from '../../../../service/account.service';
import * as forgotPasswordAction from '../actions/forgot-password.actions';
import { Constants } from 'src/app/constants/constants';


@Injectable()
export class ForgotPasswordEffect{
    constructor
    (
        private action$: Actions,
        private accountService: AccountService,
    ){}

    @Effect()
    ForgotPassword: Observable<Action> = this.action$.pipe(
        ofType<forgotPasswordAction.ForgotPassword>(forgotPasswordAction.ForgotPasswordActionEnum.ForgotPassword),
        mergeMap((model: forgotPasswordAction.ForgotPassword) =>
            this.accountService.forgotPassword(model.payload).pipe(
                map((forgotModel: ForgotPasswordModel) => {
                    return new forgotPasswordAction.ForgotPasswordSuccess(forgotModel);
                }),
                catchError(errorMessage => {
                    let error = JSON.parse(JSON.stringify(`${errorMessage.error}`));
                    if(error === Constants.UNDEFINED){
                        error = Constants.INTERNAL_SERVER_ERROR;
                    }
                    return of(new GetError(error));
                })
            )
        )
    );
}
