import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AuthorModel } from '../../models/author.model';
import { AuthorService } from '../../../../service/author.service';
import * as updateAuthorAction from '../actions/update-author.action';
import { Router } from "@angular/router";


@Injectable()
export class UpdateAuthorEffect{
    constructor(
        private authorService: AuthorService,
        private actions$: Actions,
        private router: Router
    )
    {}

    @Effect() 
    UpdateAuthor = this.actions$.pipe(
        ofType<updateAuthorAction.UpdateAuthor>(updateAuthorAction.UpdateAuthorActionEnum.UpdateAuthor),
        mergeMap((action: updateAuthorAction.UpdateAuthor) =>
            this.authorService.updateAuthor(action.payload).pipe(
                map((model: AuthorModel) => {
                    return new updateAuthorAction.UpdateAuthorSuccess(model);
                })
            ))
    );


    @Effect({dispatch: false}) 
    UpdateAuthorSuccess = this.actions$.pipe(
        ofType<updateAuthorAction.UpdateAuthorSuccess>(updateAuthorAction.UpdateAuthorActionEnum.UpdateAuthorSuccess),
        map(() => {
            window.location.reload();
        })
    );

}
