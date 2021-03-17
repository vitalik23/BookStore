import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {  map, mergeMap} from 'rxjs/operators';
import { AccountService } from '../../../../service/account.service';
import * as congirmEmailActions from '../actions/confirm-email.actions';
import { ConfirmEmailModel } from '../../models/confirm-email.model';


@Injectable()
export class ConfirmEmailEffect {
    constructor(
        private action$: Actions,
        private accountService: AccountService,
    ){}

    @Effect()
    ConfirmEmail = this.action$.pipe(
        ofType<congirmEmailActions.ConfirmEmail>(congirmEmailActions.ConfirmEmailActionEnum.ConfirmEmail),
        mergeMap((model: congirmEmailActions.ConfirmEmail) =>
            this.accountService.confirmEmail(model.payload).pipe(
                map((confirmModel: ConfirmEmailModel) => {
                    return new congirmEmailActions.ConfirmEmailSuccess(confirmModel);
                })
           )
       )
    );

}
