import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AuthorService } from '../../../../service/author.service';
import * as deleteAuthorAction from '../actions/delete-author.action';

@Injectable()
export class DeleteAuthorEffect {
    constructor(
        private authorService: AuthorService,
        private actions$: Actions
    ) { }

    @Effect()
    DeleteAuthor = this.actions$.pipe(
        ofType<deleteAuthorAction.DeleteAuthor>(deleteAuthorAction.DeleteAuthorActionEnum.DeleteAuthor),
        map((action: deleteAuthorAction.DeleteAuthor) => action.payload),
        mergeMap((id: number) =>
            this.authorService.deleteAuthor(id).pipe(
                map(() => {
                    return new deleteAuthorAction.DeleteAuthorSuccess(id);
                })
            ))
    )

    @Effect({ dispatch: false })
    DeleteAuthorSuccess = this.actions$.pipe(
        ofType<deleteAuthorAction.DeleteAuthorSuccess>(deleteAuthorAction.DeleteAuthorActionEnum.DeleteAuthorSuccess),
        map(() => {
            window.location.reload();
        })

    )


}