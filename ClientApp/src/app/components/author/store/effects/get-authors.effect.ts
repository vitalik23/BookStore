import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from 'rxjs';
import { switchMap , map } from 'rxjs/operators';
import { PageResponse } from 'src/app/models/page/page-response.model';
import { SpinnerHide, SpinnerShow } from "src/app/store/actions/spinner.action";
import { AppState } from "src/app/store/state/app-state.state";
import { AuthorService } from '../../../../service/author.service';
import * as getAuthorsAction from '../actions/get-authors.action';


@Injectable()
export class GetAuthorsEffect{
    constructor(
        private actions$: Actions,
        private authorService: AuthorService,
        private store$: Store<AppState>
    )
    {}

    @Effect()
    GetAuthors = this.actions$.pipe(
        ofType<getAuthorsAction.GetAuthors>(getAuthorsAction.GetAuthorsActionEnum.GetAuthors),
        switchMap((action) => this.authorService.getAuthors(action.payload, action.filter)),
        switchMap((model: PageResponse) => {
            return of(new getAuthorsAction.GetAuthorsSuccess(model));
        }))

    @Effect({dispatch: false})
    ShowSpinner = this.actions$.pipe(
        ofType<getAuthorsAction.GetAuthors>(getAuthorsAction.GetAuthorsActionEnum.GetAuthors),
        map(_ => this.store$.dispatch(new SpinnerShow()))
    )

    @Effect({dispatch: false})
    HideSpinner = this.actions$.pipe(
        ofType<getAuthorsAction.GetAuthorsSuccess>(getAuthorsAction.GetAuthorsActionEnum.GetAuthorsSuccess),
        map(_ => this.store$.dispatch(new SpinnerHide()))
    )

}
