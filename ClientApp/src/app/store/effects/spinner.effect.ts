import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as spinnerAction from '../actions/spinner.action';

@Injectable()
export class SpinerEffect {
    constructor
    (
        private actions$: Actions,
    )
    {}

}
