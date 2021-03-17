import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthorModel } from '../../models/author.model';
import { AuthorService } from '../../../../service/author.service';
import * as authorCreateAction from '../actions/create-author.action';


@Injectable()
export class CreateAuthorEffect {
    constructor(
        private authorService: AuthorService,
        private actions$: Actions
    ) { }

    @Effect()
    CreateAuthor: Observable<Action> = this.actions$.pipe(
        ofType<authorCreateAction.CreateAuthor>(authorCreateAction.CreateAuthorActionEnum.CreateAuthor),
        mergeMap((action: authorCreateAction.CreateAuthor) =>
            this.authorService.addAuthor(action.payload).pipe(
                map((model: AuthorModel) => {
                    return new authorCreateAction.CreateAuthorSuccess(model);
                })
            )
        )
    );

    @Effect({ dispatch: false })
    CreateAuthorSuccess = this.actions$.pipe(
        ofType<authorCreateAction.CreateAuthorSuccess>(authorCreateAction.CreateAuthorActionEnum.CreateAuthorSuccess),
        map(() => {
            window.location.reload();
        })
    );
}
