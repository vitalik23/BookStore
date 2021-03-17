import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PageResponse } from 'src/app/models/page/page-response.model';
import { AuthorService } from '../../../../service/author.service';
import * as getAuthorsAction from '../actions/get-authors.action';


@Injectable()
export class GetAuthorsEffect{
    constructor(
        private actions$: Actions,
        private authorService: AuthorService
    )
    {}

    @Effect()
    GetAuthors = this.actions$.pipe(
        ofType<getAuthorsAction.GetAuthors>(getAuthorsAction.GetAuthorsActionEnum.GetAuthors),
        switchMap((action) => this.authorService.getAuthors(action.payload, action.filter)),
        switchMap((model: PageResponse) => {
            return of(new getAuthorsAction.GetAuthorsSuccess(model));
        }))
}
