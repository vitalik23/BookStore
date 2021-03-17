import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AdminService } from "../../../../service/admin.service";
import * as listAuthorsAction from '../actions/list-authors.action';
import { map, mergeMap } from 'rxjs/operators';
import { AuthorModel } from "src/app/components/author/models/author.model";

@Injectable()
export class ListAuthorsEffect{
    constructor(
        private actions$: Actions,
        private adminService: AdminService,
    )
    {}

    @Effect()
    ListAuthors = this.actions$.pipe(
        ofType<listAuthorsAction.ListAuthors>(listAuthorsAction.ListAuthorsEnum.ListAuthors),
        mergeMap((action: listAuthorsAction.ListAuthors) => 
            this.adminService.listAuthors().pipe(
                map((model: AuthorModel[]) => {
                    return new listAuthorsAction.ListAuthorsSuccess(model);
                }),)
        ),
    );
}
